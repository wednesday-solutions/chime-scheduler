/**
 * dsh-chime-scheduler: DeepSeek Harness plugin for Chime Scheduler.
 *
 * Registers Chime Scheduler's hosted MCP server with the shared MCP manager
 * for this plugin's lifetime, tells the model to call it the Chime Scheduler
 * plugin, and shows the account on the Plugins page while the account
 * registry runs. The manager owns connection, OAuth (dynamic client
 * registration, LinkedIn sign-in), saved grants and sign-out; once a grant
 * exists, the `mcp__chime_scheduler__*` tools are listed in the system prompt.
 *
 * Same shape as DeepSeek Harness's own Linear and Notion connectors.
 * Named exports only: a default export makes the Loader drop `inject`/`apply`.
 */
import z from '@deepseek-ai/schemastery'
import { COPY } from './locales.js'

export const name = 'chime-scheduler'
export const inject = ['mcpManager', 'systemPrompt']

/** npm package name; the Plugins page account is keyed by it. */
export const PACKAGE_NAME = 'dsh-chime-scheduler'

// A fixed server name keeps tool names stable; a fixed credential key lets a
// reinstalled plugin reuse its saved grant.
export const SERVER_NAME = 'chime_scheduler'
export const CREDENTIAL_KEY = 'mcp-client/chime-scheduler'

export const GUIDANCE =
  'Tools named `mcp__chime_scheduler__*` come from the Chime Scheduler plugin. They write, schedule, publish, edit, cancel and delete LinkedIn posts on the user\'s own profile. In user-facing replies, call it the Chime Scheduler plugin, not MCP.'
  + ' Before scheduling, confirm the exact local date and time with the user. Never publish or delete a live post without the user\'s explicit confirmation.'
  + ' If no `mcp__chime_scheduler__*` tool appears in your tool list, Chime Scheduler is not connected yet; ask the user to connect it on the Chime Scheduler plugin page in Plugins.'

export const Config = z.object({
  /** Streamable HTTP MCP endpoint; defaults to Chime Scheduler's hosted server. */
  url: z.string().default('https://schedule.getchime.co/mcp'),
  /** `on-demand` (default) keeps the tools hidden until an agent loads them; `eager` sends all of them. */
  toolLoading: z.union(['eager', 'on-demand']).default('on-demand'),
})

/**
 * @param {import('@deepseek-ai/cordis').Context} ctx
 * @param {{ url: string, toolLoading: 'eager' | 'on-demand' }} config
 */
export function apply(ctx, config) {
  const cfg = Config(config ?? {})
  ctx.mcpManager.register(SERVER_NAME, {
    transport: 'streamable-http',
    url: cfg.url,
    oauth: { credentialKey: CREDENTIAL_KEY },
    toolLoading: cfg.toolLoading,
  })
  ctx.systemPrompt.section({
    name: SERVER_NAME,
    order: ctx.systemPrompt.getSectionOrder('MCP_SERVERS'),
    text: GUIDANCE,
  })
  ctx.inject(['mcpAccounts'], (scope) => {
    scope.effect(
      () => scope.mcpAccounts.register({ server: SERVER_NAME, packageName: PACKAGE_NAME, copy: COPY }),
      'chime-scheduler: Plugins page account',
    )
  })
}
