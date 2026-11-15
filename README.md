<p align="center"><img src="logo.png" width="96" alt="Chime Scheduler logo"></p>

# Chime Scheduler: free LinkedIn post scheduler for Claude, ChatGPT and any AI assistant

Schedule LinkedIn posts from your AI assistant. Chime Scheduler is a LinkedIn scheduler and MCP
server for Claude, ChatGPT, Hermes Agent, Claude Code, Cursor and any other MCP client. Write a post
with your assistant, say when it should go out in your own words ("Tuesday at 9am", "tomorrow
morning"), and it is published on your LinkedIn profile at that time. The exact time in your time
zone is echoed back, so you can catch a mistake before anything goes live.

Built for creators, founders and social media agencies who plan content in chat: a simple social
media scheduler for planning posts and keeping a content calendar without another app to learn.

**Free forever.** No install, no API key, no separate account. You sign in with LinkedIn.

**Website:** https://schedule.getchime.co

**Server URL:** `https://schedule.getchime.co/mcp` (Streamable HTTP, OAuth: sign in with LinkedIn)

## Install

| Where | How |
|---|---|
| Claude (Claude.ai, Claude Desktop) | [Chime Scheduler in the Claude directory](https://claude.ai/directory/chime-scheduler) |
| ChatGPT | [Chime Scheduler in ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_6ad9732099fc8191bdcc2e78f639a707) |
| Hermes Agent | The [`hermes/`](hermes/) package in this repo. Hermes marketplace listing coming soon; until then, use the config below. |
| Claude Code | `claude mcp add --transport http chime-scheduler https://schedule.getchime.co/mcp` |
| Any MCP client | Point it at `https://schedule.getchime.co/mcp` (Streamable HTTP) |

## What you can do

- Schedule LinkedIn posts for later, or save them as drafts.
- Publish to LinkedIn right now and get the live post link back.
- Add a first comment, such as a link, a few seconds after the post goes live.
- Post images (up to 9) or one MP4 video through a private, single-use upload link.
- See scheduled, draft and published posts; reschedule, edit or cancel anything that has not gone
  out yet.
- Check that LinkedIn is connected and when the login expires.

Chime Scheduler posts to personal LinkedIn profiles today.

## Connect

### Claude (Claude.ai, Claude Desktop)
Open [Chime Scheduler in the Claude directory](https://claude.ai/directory/chime-scheduler), add it,
and sign in with LinkedIn.

Or add it by hand: Settings → Connectors → **Add custom connector**. Name it Chime Scheduler, paste
`https://schedule.getchime.co/mcp`, click **Add**, then **Connect** and sign in with LinkedIn.

### ChatGPT
Open [Chime Scheduler in ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_6ad9732099fc8191bdcc2e78f639a707),
add it, and sign in with LinkedIn.

### Hermes Agent
Hermes marketplace listing coming soon. Until then, add this to `~/.hermes/config.yaml`:

```yaml
mcp_servers:
  chime:
    url: "https://schedule.getchime.co/mcp"
    auth: oauth
```

Then run `hermes mcp login chime` and sign in with LinkedIn in your browser. The
[`hermes/`](hermes/) folder holds the Hermes plugin package (server entry plus a scheduling skill)
that the listing will install.

### Claude Code
```bash
claude mcp add --transport http chime-scheduler https://schedule.getchime.co/mcp
```
Then run `/mcp` to sign in.

### Cursor
Add to `~/.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "chime-scheduler": { "url": "https://schedule.getchime.co/mcp" }
  }
}
```

### VS Code
Add to `.vscode/mcp.json`:
```json
{
  "servers": {
    "chime-scheduler": { "type": "http", "url": "https://schedule.getchime.co/mcp" }
  }
}
```

### Gemini CLI
```bash
gemini extensions install https://github.com/wednesday-solutions/chime-scheduler
```

### Cline
Ask Cline to set up the server from this repo; it follows [llms-install.md](llms-install.md).

### Any other MCP client
Use the server URL `https://schedule.getchime.co/mcp` with the Streamable HTTP transport. The client
discovers the OAuth settings from the server and opens the LinkedIn sign-in.

## Tools

| Tool | Read or write | What it does |
|---|---|---|
| `get_status` | Read | Whether LinkedIn is connected and when the login expires, your time zone and local time, counts of scheduled posts and drafts, posts that need attention, and recent posts with live links. |
| `schedule_post` | Write | Schedules a post for a time on your clock, or saves it as a draft, with an optional first comment and images or video. |
| `post_now` | Write | Publishes a post right away and returns the live link, or posts a held or failed post now. |
| `list_posts` | Read | Lists posts with status, local time and the start of the text. |
| `edit_post` | Write | Changes the text, first comment, time or media of a post that has not been published yet. |
| `cancel_post` | Write | Cancels a scheduled or held post or deletes a draft. Never deletes anything already on LinkedIn. |
| `get_upload_link` | Write | Creates a private, single-use upload link for up to 9 images (JPG, PNG or GIF, 8 MB each) or one MP4 video (50 MB). |
| `list_uploads` | Read | Lists recent uploads with file names, kind and size. |

## Try saying

- "Write a LinkedIn post about our product launch and schedule it for Tuesday at 9am."
- "What LinkedIn posts do I have scheduled this week?"
- "Move my hello post to Friday at 10am and add a first comment with our website."
- "Plan three LinkedIn posts for next week and schedule them for Monday, Wednesday and Friday mornings."

## How it works and privacy

You connect with Sign In with LinkedIn. Posts are published through LinkedIn's official API, only
when you ask, and only on your own personal profile. Chime Scheduler never reads your LinkedIn
feed, messages or connections. If a post can't go out (for example an expired LinkedIn login), it
is held and never posted late without you choosing to.

Limitations: personal profiles only (no company pages), posts up to 3,000 characters, no PDF
carousels, and the LinkedIn login lasts 60 days before you reconnect.

- Website: https://schedule.getchime.co
- Help: https://schedule.getchime.co/help
- Privacy: https://schedule.getchime.co/privacy
- Terms: https://schedule.getchime.co/terms
- Support: support@getchime.co

This repository holds documentation and client packages only. The server is hosted by Wednesday
Solutions; there is nothing to build or run. Chime Scheduler is not affiliated with LinkedIn.
