import { readFileSync } from 'node:fs';
import path from 'node:path';

export const CODEX_QUALITY_OUTPUT_SCHEMA = Object.freeze({
  type: 'object',
  properties: {
    files: {
      type: 'array',
      minItems: 2,
      maxItems: 2,
      items: {
        type: 'object',
        properties: {
          path: { type: 'string', enum: ['src/App.jsx', 'src/styles.css'] },
          content: { type: 'string', minLength: 1 },
        },
        required: ['path', 'content'],
        additionalProperties: false,
      },
    },
  },
  required: ['files'],
  additionalProperties: false,
});

const EDITORIAL_PRODUCT = `# Northstar Field Journal

An independent quarterly field guide for design-conscious weekend walkers. Readers value practical detail, editorial restraint, and objects worth keeping. The offer card should make issue eight feel collectible without becoming luxurious or loud.`;

const EDITORIAL_DESIGN = `# Design system

- Warm paper, dark ink, moss, and brass only.
- Georgia display type with a restrained sans body.
- Editorial, practical, quiet, and tactile.
- Reuse the existing CSS custom properties. Do not add colors, fonts, gradients, shadows, glow, glass, or decorative effects.
- Square, rule-led compositions are preferred to card stacks and rounded containers.`;

const OPERATIONS_APP = `function Metric({ label, value, detail, tone = 'neutral' }) {
  return (
    <article className={\`metric metric--\${tone}\`}>
      <p className="metric__label">{label}</p>
      <strong className="metric__value">{value}</strong>
      <p className="metric__detail">{detail}</p>
    </article>
  );
}

export default function App() {
  return (
    <main className="workspace">
      <header className="workspace__header">
        <div>
          <p className="eyebrow">Monday, 14 July</p>
          <h1>Fulfillment overview</h1>
          <p className="summary">Monitor the work that can put today’s dispatch at risk.</p>
        </div>
        <button className="button button--primary">Create dispatch</button>
      </header>

      <section className="metrics" aria-label="Dispatch metrics">
        <Metric label="Ready" value="184" detail="31 due before noon" tone="positive" />
        <Metric label="At risk" value="12" detail="4 need assignment" tone="warning" />
        <Metric label="Blocked" value="3" detail="Oldest waiting 42 min" tone="critical" />
      </section>

      <section className="queue" aria-labelledby="queue-title">
        <div className="queue__heading">
          <div>
            <p className="eyebrow">Priority queue</p>
            <h2 id="queue-title">Needs attention</h2>
          </div>
          <button className="button button--quiet">View all 19</button>
        </div>
        <table>
          <thead><tr><th>Dispatch</th><th>Destination</th><th>Owner</th><th>Status</th><th>Due</th></tr></thead>
          <tbody>
            <tr><td>DP-2048</td><td>Portland</td><td>Unassigned</td><td><span className="status status--critical">Blocked</span></td><td>09:30</td></tr>
            <tr><td>DP-2051</td><td>Oakland</td><td>M. Chen</td><td><span className="status status--warning">At risk</span></td><td>10:15</td></tr>
            <tr><td>DP-2057</td><td>Seattle</td><td>A. Singh</td><td><span className="status">Review</span></td><td>11:00</td></tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}`;

const OPERATIONS_CSS = `:root {
  --canvas: #f5f6f7;
  --surface: #ffffff;
  --surface-subtle: #eef0f2;
  --ink: #17202a;
  --ink-muted: #66717d;
  --line: #d8dde2;
  --accent: #176b5b;
  --positive: #176b5b;
  --warning: #925f09;
  --critical: #a83d32;
  --space-1: 0.375rem;
  --space-2: 0.75rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2rem;
  --radius: 0.375rem;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--canvas); color: var(--ink); }
button { font: inherit; }
.workspace { width: min(80rem, calc(100% - 2rem)); margin: 0 auto; padding: var(--space-5) 0; }
.workspace__header, .queue__heading { display: flex; align-items: end; justify-content: space-between; gap: var(--space-4); }
.eyebrow, .summary, .metric__label, .metric__detail { margin: 0; color: var(--ink-muted); }
h1 { margin: var(--space-1) 0; font-size: 2rem; }
h2 { margin: var(--space-1) 0 0; font-size: 1.25rem; }
.button { min-height: 2.5rem; padding: 0 var(--space-3); border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); color: var(--ink); font-weight: 650; }
.button--primary { border-color: var(--accent); background: var(--accent); color: white; }
.button--quiet { background: transparent; }
.metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); margin: var(--space-5) 0; }
.metric, .queue { border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); }
.metric { padding: var(--space-4); }
.metric__value { display: block; margin: var(--space-2) 0; font-size: 2rem; }
.metric--warning { border-top: 0.25rem solid var(--warning); }
.metric--critical { border-top: 0.25rem solid var(--critical); }
.metric--positive { border-top: 0.25rem solid var(--positive); }
.queue { overflow: hidden; }
.queue__heading { padding: var(--space-4); border-bottom: 1px solid var(--line); }
table { width: 100%; border-collapse: collapse; }
th, td { padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--line); text-align: left; }
th { background: var(--surface-subtle); color: var(--ink-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
.status { display: inline-flex; padding: var(--space-1) var(--space-2); border-radius: var(--radius); background: var(--surface-subtle); font-weight: 650; }
.status--warning { color: var(--warning); }
.status--critical { color: var(--critical); }
@media (max-width: 44rem) {
  .workspace__header { align-items: stretch; flex-direction: column; }
  .metrics { grid-template-columns: 1fr; }
  .queue { overflow-x: auto; }
}`;

export function createCodexQualityTasks({ repoRoot }) {
  const fixtureDir = path.join(repoRoot, 'tests', 'framework-fixtures', 'vite8-react-brand-fidelity', 'files', 'src');
  return [
    {
      id: 'editorial-bolder',
      action: 'bolder',
      brief: 'Make the Field Notes offer card materially bolder. Keep it unmistakably Northstar: amplify hierarchy, proportion, and composition inside the existing design system. Preserve every word and the ActionLink component.',
      product: EDITORIAL_PRODUCT,
      design: EDITORIAL_DESIGN,
      files: {
        'src/App.jsx': readFileSync(path.join(fixtureDir, 'App.jsx'), 'utf-8'),
        'src/styles.css': readFileSync(path.join(fixtureDir, 'styles.css'), 'utf-8'),
      },
      requiredCopy: ['Quarterly print edition', 'Field Notes', 'Four routes, annotated maps, and practical details for unhurried weekends.', 'Reserve issue eight'],
      requiredSource: ['function ActionLink', '<ActionLink>Reserve issue eight</ActionLink>', 'aria-labelledby=field-notes-title'],
      requiredTokens: ['--color-paper', '--color-paper-deep', '--color-ink', '--color-moss', '--color-brass', '--font-display', '--font-body'],
      forbidden: [/gradient\s*\(/i, /box-shadow\s*:/i, /filter\s*:\s*blur/i, /#[0-9a-f]{3,8}\b/gi],
      judgeFocus: 'Is the selected offer materially more decisive through hierarchy/proportion/composition, while remaining restrained editorial design rather than generic AI boldness?',
    },
    {
      id: 'operations-polish',
      action: 'polish',
      brief: 'Polish this fulfillment dashboard to flagship quality. Improve hierarchy, scanning, density, alignment, interaction states, responsive behavior, and accessibility. Keep the existing information architecture, components, terminology, and token palette.',
      product: '# Relay\n\nAn operations workspace for fulfillment leads. The dashboard must support rapid scanning under time pressure; calm precision matters more than personality or visual novelty.',
      design: '# Relay design system\n\nCompact, neutral, table-first application UI. Use existing tokens and components. Status color communicates meaning only. Avoid gradients, decorative shadows, oversized display type, rounded-card proliferation, and invented navigation.',
      files: { 'src/App.jsx': OPERATIONS_APP, 'src/styles.css': OPERATIONS_CSS },
      requiredCopy: ['Fulfillment overview', 'Create dispatch', 'Ready', 'At risk', 'Blocked', 'Needs attention', 'View all 19', 'DP-2048', 'DP-2051', 'DP-2057'],
      requiredSource: ['function Metric', '<Metric label=Ready', '<table', 'aria-labelledby=queue-title'],
      requiredTokens: ['--canvas', '--surface', '--ink', '--ink-muted', '--line', '--accent', '--positive', '--warning', '--critical'],
      forbidden: [/gradient\s*\(/i, /box-shadow\s*:/i, /backdrop-filter/i, /border-radius\s*:\s*(?:1|2|3|4|5|6|7|8|9)rem/i],
      judgeFocus: 'Is this a materially more polished, efficient operations surface, with excellent scan hierarchy and interaction detail, without changing its product model or turning it into a decorative dashboard?',
    },
  ];
}

export function buildCodexQualityPrompt(task, { actionReference = '', fullContext = false } = {}) {
  return [
    `Impeccable Live task: /${task.action}`,
    task.brief,
    '',
    'Return exactly the two complete revised files required by the output schema. Do not explain the answer.',
    'This is an automated one-shot task: do not ask questions. Preserve visible copy and functional component contracts.',
    fullContext ? 'The Impeccable skill is attached. Its Setup context has already been resolved and is included below; do not rerun setup.' : '',
    '',
    '<product_context>', task.product, '</product_context>',
    '<design_context>', task.design, '</design_context>',
    '<action_reference>', actionReference, '</action_reference>',
    '<source_files>', JSON.stringify(task.files, null, 2), '</source_files>',
  ].filter((line) => line !== '').join('\n');
}

export function scoreCodexQualityOutput(task, output) {
  const files = Array.isArray(output?.files) ? output.files : [];
  const byPath = Object.fromEntries(files.map((file) => [file?.path, String(file?.content || '')]));
  const combined = Object.values(byPath).join('\n');
  const source = byPath['src/App.jsx'] || '';
  const css = byPath['src/styles.css'] || '';
  const normalizedSource = source.replace(/[\s"']/g, '');
  const checks = {
    exactFiles: files.length === 2 && Boolean(source) && Boolean(css),
    implementationChanged: source !== task.files['src/App.jsx'] || css !== task.files['src/styles.css'],
    copyPreserved: task.requiredCopy.every((value) => combined.includes(value)),
    contractsPreserved: task.requiredSource.every((value) => normalizedSource.includes(value.replace(/[\s"']/g, ''))),
    tokensPreserved: task.requiredTokens.every((value) => css.includes(value)),
    noForbiddenDrift: task.forbidden.every((pattern) => {
      pattern.lastIndex = 0;
      const outputMatches = combined.match(pattern) || [];
      pattern.lastIndex = 0;
      const inputMatches = Object.values(task.files).join('\n').match(pattern) || [];
      return outputMatches.length <= inputMatches.length;
    }),
  };
  return {
    passed: Object.values(checks).every(Boolean),
    checks,
  };
}

export function buildJudgePrompt(task, output) {
  return [
    'You are an exacting independent frontend design reviewer. Score the revised code, not the prose around it.',
    'Return JSON only with integer scores from 1-10 for commandFidelity, brandAndSystemFidelity, frontendQuality, and taskCompletion; plus criticalFailure (boolean) and summary (one short sentence).',
    'A score of 7 means clearly shippable and materially improved. Penalize generic AI aesthetics, token drift, invented content, component destruction, and superficial changes.',
    '',
    `TASK: /${task.action} — ${task.brief}`,
    `REVIEW FOCUS: ${task.judgeFocus}`,
    '<product_context>', task.product, '</product_context>',
    '<design_context>', task.design, '</design_context>',
    '<before>', JSON.stringify(task.files, null, 2), '</before>',
    '<after>', JSON.stringify(output?.files || [], null, 2), '</after>',
  ].join('\n');
}

export function parseJudgeResult(text) {
  const match = String(text || '').match(/\{[\s\S]*\}/);
  if (!match) throw new Error('judge returned no JSON object');
  const result = JSON.parse(match[0]);
  const keys = ['commandFidelity', 'brandAndSystemFidelity', 'frontendQuality', 'taskCompletion'];
  const scores = Object.fromEntries(keys.map((key) => [key, Number(result[key])]));
  const passed = keys.every((key) => Number.isInteger(scores[key]) && scores[key] >= 7)
    && result.criticalFailure !== true;
  return { ...result, ...scores, passed };
}

export function summarizeCodexQualityRuns(runs) {
  const finished = runs.filter((run) => !run.error);
  const latencies = finished.map((run) => run.durationMs).sort((a, b) => a - b);
  const judged = finished.filter((run) => run.judge);
  const scoreKeys = ['commandFidelity', 'brandAndSystemFidelity', 'frontendQuality', 'taskCompletion'];
  return {
    runs: runs.length,
    passed: finished.filter((run) => run.passed).length,
    medianDurationMs: percentile(latencies, 0.5),
    p95DurationMs: percentile(latencies, 0.95),
    averageJudgeScores: Object.fromEntries(scoreKeys.map((key) => [
      key,
      judged.length ? round(judged.reduce((sum, run) => sum + run.judge[key], 0) / judged.length) : null,
    ])),
  };
}

function percentile(values, quantile) {
  if (values.length === 0) return null;
  const index = (values.length - 1) * quantile;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) return round(values[lower]);
  return round(values[lower] + (values[upper] - values[lower]) * (index - lower));
}

function round(value) {
  return Math.round(value * 100) / 100;
}
