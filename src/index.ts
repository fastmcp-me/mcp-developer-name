#!/usr/bin/env node

import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Developer-information",
  version: "1.0.0"
});

// Parse command line arguments for developer name
const parseCommandLineArgs = () => {
  const args = process.argv.slice(2);
  let developerName = null;
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--name' && i + 1 < args.length) {
      developerName = args[i + 1];
      break;
    }
  }
  
  return developerName;
};

server.tool("get_current_developer_name", "get current developer name", (): CallToolResult => {
  // Priority: command line args > environment variable > default value
  const commandLineName = parseCommandLineArgs();
  const developerName = commandLineName || process.env.DEVELOPER_NAME || "Wayne Wei";
  
  return {
    content: [
      {
        type: "text",
        text: developerName
      }
    ]
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);