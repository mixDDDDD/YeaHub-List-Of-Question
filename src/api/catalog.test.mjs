import assert from 'node:assert/strict';
import test from 'node:test';
import { getCatalog } from './catalog.ts';

test('catalog follows total across pages and preserves order and filters', async (t) => {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url) => {
    const params = new URL(url, 'http://localhost').searchParams;
    calls.push(params);
    return Response.json({ data: params.get('page') === '1' ? [{ id: 2 }, { id: 1 }] : [{ id: 3 }], total: 3 });
  });
  try {
    assert.deepEqual(await getCatalog('skills', new URLSearchParams({ specializations: '11' })), [{ id: 2 }, { id: 1 }, { id: 3 }]);
    assert.deepEqual(calls.map((p) => p.get('page')), ['1', '2']);
    assert.ok(calls.every((p) => p.get('specializations') === '11' && p.get('limit') === '100'));
  } finally { t.mock.restoreAll(); }
});

test('catalog rejects an incomplete or invalid response', async (t) => {
  for (const payload of [{ data: [], total: 1 }, { data: [], total: null }]) {
    t.mock.method(globalThis, 'fetch', async () => Response.json(payload));
    try { await assert.rejects(getCatalog('skills', new URLSearchParams())); }
    finally { t.mock.restoreAll(); }
  }
});

test('catalog honors cancellation between pages', async (t) => {
  const controller = new AbortController();
  let calls = 0;
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    assert.equal(options.signal, controller.signal);
    calls++;
    controller.abort();
    return Response.json({ data: [{ id: 1 }], total: 2 });
  });
  try {
    await assert.rejects(getCatalog('skills', new URLSearchParams(), controller.signal), { name: 'AbortError' });
    assert.equal(calls, 1);
  } finally { t.mock.restoreAll(); }
});
