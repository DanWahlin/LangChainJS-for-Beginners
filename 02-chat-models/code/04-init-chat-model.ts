/**
 * Provider-Agnostic Model Initialization
 * Run: npx tsx 02-chat-models/code/04-init-chat-model.ts
 *
 * initChatModel() is a helper for switching between provider types
 * (OpenAI, Anthropic, Google, etc.) with similar code.
 *
 * This course uses Microsoft Foundry's OpenAI-compatible endpoint
 * (AI_ENDPOINT ending in /openai/v1). For that setup, ChatOpenAI with
 * configuration.baseURL is the recommended approach - the same pattern
 * used in every other example.
 *
 * Do not use initChatModel("azure_openai:...") for this course. That
 * creates AzureChatOpenAI and expects AZURE_OPENAI_* environment
 * variables, which are not how this course is configured.
 *
 * 🤖 Try asking GitHub Copilot Chat (https://github.com/features/copilot):
 * - "What are the advantages of initChatModel over using ChatOpenAI directly?"
 * - "How would I switch from OpenAI to Anthropic using initChatModel?"
 */

import { initChatModel, HumanMessage } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import "dotenv/config";

async function standardOpenAIExample() {
  console.log("\n=== initChatModel() with Standard OpenAI ===\n");

  // NOTE: Without a custom baseURL this talks to api.openai.com and needs
  // an OpenAI API key. Microsoft Foundry credentials will not work here.
  // Uncomment and add OPENAI_API_KEY to your .env to test:
  /*
  const model = await initChatModel("gpt-5-mini", {
    modelProvider: "openai",
    temperature: 0.7,
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await model.invoke([
    new HumanMessage("What is LangChain.js in one sentence?")
  ]);

  console.log("Response:", response.content);
  */

  console.log("This example requires a standard OpenAI API key (api.openai.com).");
  console.log("For Microsoft Foundry, use ChatOpenAI with configuration.baseURL (see below).\n");
}

async function switchingProviders() {
  console.log("\n=== Switching Between Providers ===\n");

  // This is where initChatModel() shines - switching providers with similar code:
  /*
  const openaiModel = await initChatModel("openai:gpt-5-mini", {
    apiKey: process.env.OPENAI_API_KEY,
  });

  const anthropicModel = await initChatModel("anthropic:claude-sonnet-4-6", {
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const googleModel = await initChatModel("google-genai:gemini-2.5-flash", {
    apiKey: process.env.GOOGLE_API_KEY,
  });
  */

  console.log("initChatModel() excels at switching between different providers");
  console.log("(OpenAI, Anthropic, Google, etc.) with similar code structure.\n");
}

async function courseRecommendation() {
  console.log("\n=== Recommended Approach for This Course ===\n");

  // Microsoft Foundry exposes an OpenAI-compatible /openai/v1 endpoint.
  // ChatOpenAI + configuration.baseURL is the matching client for that API.
  const model = new ChatOpenAI({
    model: process.env.AI_MODEL,
    configuration: { baseURL: process.env.AI_ENDPOINT },
    apiKey: process.env.AI_API_KEY,
  });

  const response = await model.invoke([new HumanMessage("What is LangChain.js in one sentence?")]);

  console.log("✅ Using ChatOpenAI (recommended for this course)");
  console.log("Response:", response.content);
  console.log("\nWhy ChatOpenAI?");
  console.log("- Matches Microsoft Foundry's OpenAI-compatible /openai/v1 endpoint");
  console.log("- Uses this course's AI_API_KEY, AI_ENDPOINT, and AI_MODEL variables");
  console.log("- Same explicit pattern as every other example in the course");
}

// Run all examples
async function main() {
  console.log("🔌 Provider-Agnostic Initialization Concepts\n");
  console.log("=".repeat(60));

  try {
    await standardOpenAIExample();
    await switchingProviders();
    await courseRecommendation();

    console.log("\n" + "=".repeat(60));
    console.log("\n📚 Key Takeaway:");
    console.log("- initChatModel() is great for switching between provider types");
    console.log("- For Microsoft Foundry in this course, ChatOpenAI is recommended");
    console.log("- Both approaches are valid - choose based on your needs\n");
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
