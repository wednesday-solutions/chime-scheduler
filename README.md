<p align="center"><img src="logo.png" width="96" alt="Chime Scheduler logo"></p>

# Chime Scheduler

A hosted MCP server that schedules and publishes LinkedIn posts from your AI chat. Write a post with your assistant, say when it should go out in your own words ("Tuesday at 9am", "tomorrow morning"), and it is published on your LinkedIn profile at that time. The exact time in your time zone is echoed back, so you can catch a mistake before anything goes live.

**Server URL:** `https://schedule.getchime.co/mcp` (Streamable HTTP, OAuth: sign in with LinkedIn)

Free. No install, no API key, no separate account.

## What you can do
- Schedule LinkedIn posts for later, or save them as drafts.
- Publish to LinkedIn right now and get the live post link back.
- Add a first comment, such as a link, a few seconds after the post goes live.
- Post images (up to 9) or one MP4 video through a private, single-use upload link.
- See scheduled, draft and published posts; reschedule, edit or cancel anything that has not gone out yet.
- Check that LinkedIn is connected and when the login expires.

## Connect

### Claude (Claude.ai, Claude Desktop)
Settings → Connectors → **Add custom connector**. Name it Chime Scheduler, paste `https://schedule.getchime.co/mcp`, click **Add**, then **Connect** and sign in with LinkedIn.

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
Use the server URL above with the Streamable HTTP transport. The client discovers the OAuth settings from the server and opens the LinkedIn sign-in.

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

## How it works and privacy
You connect with Sign In with LinkedIn. Posts are published through LinkedIn's official API, only when you ask, and only on your own personal profile. Chime Scheduler never reads your LinkedIn feed, messages or connections. If a post can't go out (for example an expired LinkedIn login), it is held and never posted late without you choosing to.

Limitations: personal profiles only (no company pages), posts up to 3,000 characters, no PDF carousels, and the LinkedIn login lasts 60 days before you reconnect.

- Help: https://schedule.getchime.co/help
- Privacy: https://schedule.getchime.co/privacy
- Terms: https://schedule.getchime.co/terms
- Support: customercare@wednesday.is

This repository holds documentation only. The server is hosted by Wednesday Solutions; there is nothing to build or run.
