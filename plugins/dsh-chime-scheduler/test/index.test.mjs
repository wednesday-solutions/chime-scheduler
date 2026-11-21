// Minimal checks with a fake context: the plugin registers the OAuth server,
// the guidance section and the Plugins page account, with stable names.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as plugin from '../lib/index.js'
import { COPY } from '../lib/locales.js'

function fakeCtx() {
  const calls = { register: [], section: [], accounts: [] }
  const ctx = {
    mcpManager: { register: (name, entry) => calls.register.push({ name, entry }) },
    systemPrompt: { section: s => calls.section.push(s), getSectionOrder: () => 100 },
    inject: (_deps, fn) => fn({ effect: f => f(), mcpAccounts: { register: r => calls.accounts.push(r) } }),
  }
  return { ctx, calls }
}

test('registers the hosted server with OAuth and a fixed credential key', () => {
  const { ctx, calls } = fakeCtx()
  plugin.apply(ctx, {})
  assert.equal(calls.register.length, 1)
  const { name, entry } = calls.register[0]
  assert.equal(name, 'chime_scheduler')
  assert.equal(entry.transport, 'streamable-http')
  assert.equal(entry.url, 'https://schedule.getchime.co/mcp')
  assert.deepEqual(entry.oauth, { credentialKey: 'mcp-client/chime-scheduler' })
  assert.equal(entry.toolLoading, 'on-demand')
  assert.equal(entry.headers, undefined, 'OAuth cannot be combined with an Authorization header')
})

test('adds model guidance and the Plugins page account', () => {
  const { ctx, calls } = fakeCtx()
  plugin.apply(ctx, { toolLoading: 'eager' })
  assert.equal(calls.register[0].entry.toolLoading, 'eager')
  assert.match(calls.section[0].text, /mcp__chime_scheduler__/)
  assert.equal(calls.accounts[0].server, 'chime_scheduler')
  assert.equal(calls.accounts[0].packageName, 'dsh-chime-scheduler')
})

test('copy has every field the account section needs, in English', () => {
  for (const t of [COPY.title, COPY.connect, COPY.activation.title, COPY.activation.body,
    ...Object.values(COPY.detail), COPY.signOut.title, COPY.signOut.body, COPY.notice.connected, COPY.notice.signedOut]) {
    assert.ok(t.en && t.en.length > 0)
  }
  assert.deepEqual(Object.keys(COPY.detail).sort(),
    ['authorizing', 'connected', 'connecting', 'disconnected', 'rejected', 'scope', 'waitingBrowser'])
})

test('server name fits the MCP client name rule', () => {
  assert.match(plugin.SERVER_NAME, /^[A-Za-z0-9_-]{1,32}$/)
})
