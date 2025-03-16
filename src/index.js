#!/usr/bin/env node

import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Developer-information",
  version: "1.0.0"
});

server.tool("get_current_developer_name", "get current developer name", () => {
  return {
    content: [
      {
        type: "text",
        text: process.env.DEVELOPER_NAME || "Wayne Wei"
      }
    ]
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);