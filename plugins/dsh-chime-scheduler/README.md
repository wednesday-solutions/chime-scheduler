# dsh-chime-scheduler

DeepSeek Harness plugin for [Chime Scheduler](https://schedule.getchime.co): write, schedule, publish, edit and delete LinkedIn posts on your own profile from the agent, with images, video and a first comment. Free.

It registers Chime Scheduler's hosted MCP server (`https://schedule.getchime.co/mcp`, Streamable HTTP, OAuth with dynamic client registration) with DeepSeek Harness's MCP manager and adds a **Chime Scheduler account** section to the Plugins page. There is no API key: you connect from the Plugins page and sign in with LinkedIn in your browser.

## Install

```sh
dsh plugin --profile web add "github:wednesday-solutions/chime-scheduler#path:/plugins/dsh-chime-scheduler"
```

Restart `dsh web`, open **Plugins → Chime Scheduler**, click **Connect Chime Scheduler** and sign in with LinkedIn. Authorization completes in a browser on the computer running DSH.

## Use

Ask in plain words, for example:

- "Write a LinkedIn post about our launch and schedule it for Tuesday at 9am."
- "What's scheduled this week?"
- "Move Thursday's post to Friday morning."

The agent confirms the exact local time before scheduling, and asks before it publishes or deletes a live post. Tools appear as `mcp__chime_scheduler__*`.

## Configure

Override on the `chime-scheduler` row of your profile's `cordis.patch.yml`:

| Field | Default | Meaning |
|---|---|---|
| `url` | `https://schedule.getchime.co/mcp` | MCP endpoint |
| `toolLoading` | `on-demand` | `eager` sends every tool to each agent |

## Links

- Setup guide and help: https://schedule.getchime.co/help
- Privacy: https://schedule.getchime.co/privacy
- Support: support@getchime.co
