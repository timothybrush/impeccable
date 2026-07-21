import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCRIPT = path.join(ROOT, 'skill', 'scripts', 'serve-question.mjs');

function startServer(payload, extraArgs = []) {
  const dir = mkdtempSync(path.join(tmpdir(), 'serve-question-'));
  const payloadPath = path.join(dir, 'q.json');
  writeFileSync(payloadPath, JSON.stringify(payload));
  const child = spawn(process.execPath, [SCRIPT, '--payload', payloadPath, '--no-open', '--timeout', '30', ...extraArgs], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return new Promise((resolve, reject) => {
    let out = '';
    const timer = setTimeout(() => reject(new Error(`no URL in output: ${out}`)), 10000);
    child.stdout.on('data', (chunk) => {
      out += chunk;
      const match = out.match(/QUESTION URL: (http:\/\/127\.0\.0\.1:\d+\/)/);
      if (match) { clearTimeout(timer); resolve({ child, url: match[1], read: () => out }); }
    });
  });
}

const PAYLOAD = {
  title: 'Choose the visual world',
  question: 'The roll assigned Fillmore Handbill.',
  options: [
    { id: 'assigned', label: 'Fillmore Handbill', kicker: 'THE ROLL', lineage: '1966-71 psychedelic handbills' },
    { id: 'challenger-1', label: 'Teletext Service', body: 'block-mosaic broadcast pages' },
  ],
  reroll: true,
  steer: true,
};

describe('serve-question', () => {
  it('serves the page, records the answer, prints ANSWER, exits 0', async () => {
    const { child, url, read } = await startServer(PAYLOAD);
    const html = await (await fetch(url)).text();
    assert.match(html, /Fillmore Handbill/);
    assert.match(html, /THE ROLL/);
    assert.match(html, /Re-roll/);
    const post = await fetch(`${url}answer`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ optionId: 'assigned', steer: 'warmer palette' }),
    });
    assert.equal(post.status, 200);
    const code = await new Promise((resolve) => child.on('exit', resolve));
    assert.equal(code, 0);
    assert.match(read(), /ANSWER: \{"optionId":"assigned","steer":"warmer palette"\}/);
  });

  it('re-roll answers round-trip with their own id', async () => {
    const { child, url, read } = await startServer(PAYLOAD);
    await fetch(`${url}answer`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ optionId: 'reroll', steer: '' }),
    });
    const code = await new Promise((resolve) => child.on('exit', resolve));
    assert.equal(code, 0);
    assert.match(read(), /"optionId":"reroll"/);
  });

  it('rejects an empty payload', async () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'serve-question-'));
    const payloadPath = path.join(dir, 'q.json');
    writeFileSync(payloadPath, JSON.stringify({ options: [] }));
    const code = await new Promise((resolve) => {
      const child = spawn(process.execPath, [SCRIPT, '--payload', payloadPath, '--no-open'], { stdio: 'ignore' });
      child.on('exit', resolve);
    });
    assert.equal(code, 1);
  });
});
