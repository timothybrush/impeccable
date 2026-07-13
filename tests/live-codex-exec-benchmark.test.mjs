import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { PassThrough } from 'node:stream';
import { describe, it } from 'node:test';

import {
  runCodexExecBenchmark,
  summarizeArchitectureRuns,
} from '../scripts/lib/codex-exec-benchmark.mjs';

describe('direct Codex architecture benchmark', () => {
  it('records JSONL lifecycle and token events from codex exec', async () => {
    const child = new EventEmitter();
    child.stdout = new PassThrough();
    child.stderr = new PassThrough();
    child.kill = () => true;
    const resultPromise = runCodexExecBenchmark({
      args: ['exec', '--json', 'work'],
      spawnFactory: () => child,
    });
    child.stdout.write('{"type":"thread.started","thread_id":"one"}\n');
    child.stdout.write('{"type":"turn.started"}\n');
    child.stdout.write('{"type":"item.completed","item":{"type":"agent_message","text":"done"}}\n');
    child.stdout.write('{"type":"turn.completed","usage":{"input_tokens":100,"cached_input_tokens":60,"output_tokens":20}}\n');
    child.emit('exit', 0, null);
    const result = await resultPromise;
    assert.equal(result.events.length, 4);
    assert.equal(result.usage.input_tokens, 100);
    assert.ok(result.threadStartedMs >= 0);
    assert.ok(result.firstAgentMessageMs >= result.turnStartedMs);
  });

  it('summarizes startup, generation, total, quality, and token medians', () => {
    const summary = summarizeArchitectureRuns([
      { passed: true, startupMs: 10, generationMs: 100, firstUsableMs: 110, totalMs: 110, usage: { input_tokens: 1000, cached_input_tokens: 500, output_tokens: 100 } },
      { passed: false, startupMs: 20, generationMs: 200, firstUsableMs: 220, totalMs: 220, usage: { input_tokens: 2000, cached_input_tokens: 1000, output_tokens: 200 } },
    ]);
    assert.equal(summary.runs, 2);
    assert.equal(summary.passed, 1);
    assert.equal(summary.medianTotalMs, 165);
    assert.equal(summary.medianFirstUsableMs, 165);
    assert.equal(summary.medianInputTokens, 1500);
  });
});
