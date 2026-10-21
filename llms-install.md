# Installing Chime Scheduler (for AI agents)

Chime Scheduler is a hosted remote MCP server. There is nothing to download, build or run, and no API key.

1. Add a remote MCP server named `chime-scheduler` with:
   - URL: `https://schedule.getchime.co/mcp`
   - Transport: Streamable HTTP
   For Cline, add this to `cline_mcp_settings.json`:
   ```json
   {
     "mcpServers": {
       "chime-scheduler": {
         "type": "streamableHttp",
         "url": "https://schedule.getchime.co/mcp"
       }
     }
   }
   ```
2. The server answers unauthenticated requests with 401 and points to its OAuth metadata. Start the OAuth sign-in when prompted; the user signs in with LinkedIn in their browser.
3. Check the connection by calling `get_status`. It returns whether LinkedIn is connected, the user's time zone and local time.

Troubleshooting:
- If `get_status` says the LinkedIn login has expired (it lasts 60 days), give the user the reconnect link it returns.
- Only personal LinkedIn profiles are supported, not company pages.
- Help: https://schedule.getchime.co/help
