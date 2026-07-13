import assert from 'node:assert/strict';
import path from 'node:path';
import { describe, it } from 'node:test';

import {
  buildCodexQualityPrompt,
  createCodexQualityTasks,
  parseJudgeResult,
  scoreCodexQualityOutput,
  summarizeCodexQualityRuns,
} from '../scripts/lib/live-codex-quality-benchmark.mjs';

const repoRoot = path.resolve(import.meta.dirname, '..');
const tasks = createCodexQualityTasks({ repoRoot });

describe('Codex Live quality benchmark', () => {
  it('covers full bolder and polish tasks with project and action context', () => {
    assert.deepEqual(tasks.map((task) => `${task.action}:${task.id}`), [
      'bolder:editorial-bolder',
      'polish:operations-polish',
    ]);
    const prompt = buildCodexQualityPrompt(tasks[0], { actionReference: 'BOLDER', fullContext: true });
    assert.match(prompt, /Impeccable skill is attached/);
    assert.match(prompt, /<product_context>/);
    assert.match(prompt, /<design_context>/);
    assert.match(prompt, /BOLDER/);
    assert.match(prompt, /src\/App\.jsx/);
  });

  it('rejects no-op, contract-breaking, and design-system-drifting output', () => {
    const task = tasks[0];
    const noOp = { files: Object.entries(task.files).map(([filePath, content]) => ({ path: filePath, content })) };
    assert.equal(scoreCodexQualityOutput(task, noOp).passed, false);

    const cssOnly = {
      files: [
        { path: 'src/App.jsx', content: task.files['src/App.jsx'] },
        { path: 'src/styles.css', content: `${task.files['src/styles.css']}\n.offer-card { min-height: 30rem; }` },
      ],
    };
    assert.equal(scoreCodexQualityOutput(task, cssOnly).passed, true, 'CSS-only design work is a material implementation change');

    const drift = {
      files: [
        { path: 'src/App.jsx', content: task.files['src/App.jsx'].replace('Field Notes', 'Neon Notes') },
        { path: 'src/styles.css', content: `${task.files['src/styles.css']}\n.offer-card { background: linear-gradient(red, blue); }` },
      ],
    };
    const score = scoreCodexQualityOutput(task, drift);
    assert.equal(score.checks.copyPreserved, false);
    assert.equal(score.checks.noForbiddenDrift, false);
  });

  it('parses strict judge results and summarizes latency and quality', () => {
    const judge = parseJudgeResult('{"commandFidelity":8,"brandAndSystemFidelity":9,"frontendQuality":7,"taskCompletion":8,"criticalFailure":false,"summary":"Good."}');
    assert.equal(judge.passed, true);
    const summary = summarizeCodexQualityRuns([
      { durationMs: 100, passed: true, judge },
      { durationMs: 300, passed: false, judge: { ...judge, frontendQuality: 6 } },
    ]);
    assert.equal(summary.medianDurationMs, 200);
    assert.equal(summary.passed, 1);
    assert.equal(summary.averageJudgeScores.frontendQuality, 6.5);
  });
});
