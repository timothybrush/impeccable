import { spawn } from 'node:child_process';
import { performance } from 'node:perf_hooks';

export function runCodexExecBenchmark({
  command = 'codex',
  args,
  cwd = process.cwd(),
  env = process.env,
  timeoutMs = 300_000,
  spawnFactory = spawn,
} = {}) {
  if (!Array.isArray(args) || args.length === 0) throw new TypeError('args are required');
  const startedAt = performance.now();
  return new Promise((resolve, reject) => {
    const child = spawnFactory(command, args, {
      cwd,
      env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    let buffer = '';
    let threadStartedMs = null;
    let turnStartedMs = null;
    let firstAgentMessageMs = null;
    let usage = null;
    const events = [];
    const timer = setTimeout(() => {
      child.kill('SIGTERM');
      reject(new Error(`codex exec timed out after ${timeoutMs}ms`));
    }, timeoutMs);
    timer.unref?.();

    const consumeLine = (line) => {
      if (!line.trim()) return;
      let event;
      try { event = JSON.parse(line); } catch { return; }
      events.push(event);
      const elapsed = performance.now() - startedAt;
      if (event.type === 'thread.started' && threadStartedMs == null) threadStartedMs = elapsed;
      if (event.type === 'turn.started' && turnStartedMs == null) turnStartedMs = elapsed;
      if (event.type === 'item.completed' && event.item?.type === 'agent_message' && firstAgentMessageMs == null) {
        firstAgentMessageMs = elapsed;
      }
      if (event.type === 'turn.completed') usage = event.usage || null;
    };

    child.stdout.on('data', (chunk) => {
      const text = String(chunk);
      stdout += text;
      buffer += text;
      let newline;
      while ((newline = buffer.indexOf('\n')) !== -1) {
        consumeLine(buffer.slice(0, newline));
        buffer = buffer.slice(newline + 1);
      }
    });
    child.stderr.on('data', (chunk) => { stderr += String(chunk); });
    child.once('error', (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.once('exit', (code, signal) => {
      clearTimeout(timer);
      if (buffer) consumeLine(buffer);
      const durationMs = performance.now() - startedAt;
      if (code !== 0) {
        const error = new Error(`codex exec failed (${code ?? signal}): ${stderr || stdout}`);
        error.code = code;
        reject(error);
        return;
      }
      resolve({
        durationMs,
        threadStartedMs,
        turnStartedMs,
        firstAgentMessageMs,
        usage,
        events,
        stdout,
        stderr,
      });
    });
  });
}

export function summarizeArchitectureRuns(runs) {
  const completed = runs.filter((run) => !run.error);
  return {
    runs: runs.length,
    passed: completed.filter((run) => run.passed).length,
    medianFirstUsableMs: percentile(completed.map((run) => run.firstUsableMs).filter(Number.isFinite), 0.5),
    p95FirstUsableMs: percentile(completed.map((run) => run.firstUsableMs).filter(Number.isFinite), 0.95),
    medianTotalMs: percentile(completed.map((run) => run.totalMs), 0.5),
    p95TotalMs: percentile(completed.map((run) => run.totalMs), 0.95),
    medianStartupMs: percentile(completed.map((run) => run.startupMs).filter(Number.isFinite), 0.5),
    medianGenerationMs: percentile(completed.map((run) => run.generationMs).filter(Number.isFinite), 0.5),
    medianInputTokens: percentile(completed.map((run) => run.usage?.input_tokens).filter(Number.isFinite), 0.5),
    medianCachedInputTokens: percentile(completed.map((run) => run.usage?.cached_input_tokens).filter(Number.isFinite), 0.5),
    medianOutputTokens: percentile(completed.map((run) => run.usage?.output_tokens).filter(Number.isFinite), 0.5),
  };
}

function percentile(values, quantile) {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const index = (sorted.length - 1) * quantile;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const value = lower === upper
    ? sorted[lower]
    : sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
  return Math.round(value * 100) / 100;
}
