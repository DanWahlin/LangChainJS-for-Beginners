# Course Setup

Welcome! Before we dive into building AI applications with LangChain.js, let's get your development environment ready. This chapter walks you through installing Node.js, setting up Microsoft Foundry for AI model access, and configuring your project environment. By the end, you'll have everything you need to start building with LangChain.js.

## Prerequisites

- A GitHub account (free)
- An Azure subscription (for Microsoft Foundry)
- Basic command line knowledge
- Text editor or IDE

## 📋 What You'll Set Up

1. Node.js and npm
2. Microsoft Foundry project, models, and API credentials
3. Project dependencies
4. Environment variables
5. VS Code (recommended IDE)

---

## 📖 The Workshop Analogy

**Just like setting up a workshop before building furniture, you need to prepare your development environment before building AI applications.**

You'll install Node.js, get access to AI models, and configure your tools. This ensures you have a solid foundation and smooth development experience. Let's get your workshop ready—it takes just 15 minutes!

## Setup Options

Choose from one of the following options to set up your development environment:

1. **GitHub Codespaces**: Use a cloud-based development environment.
2. **Local Development**: Set up your environment on your machine.

After Codespaces or local setup, continue with **Microsoft Foundry**, `.env` configuration, and the setup test. Those steps are required for both options.

---

## GitHub Codespaces

If you prefer not to set up your local environment, you can use **GitHub Codespaces** which is a cloud-based development environment that runs in your browser.

1. **Create a Codespace**: Open the [langchainjs-for-beginners](https://github.com/microsoft/langchainjs-for-beginners) on GitHub and click on the green "Code" button. Select "Open with Codespaces" and "New codespace".
2. **Wait for Initialization**: It will take a few moments to set up your environment.
3. **Access the Terminal**: Once ready, open the terminal in Codespaces (Terminal > New Terminal).
4. **Continue below**: Skip the local Node.js and clone steps. Go to [Set Up Microsoft Foundry](#set-up-microsoft-foundry), then configure `.env` and run the setup test.

---

## Local Development

### Step 1: Install Node.js

You'll need **Node.js LTS (Long Term Support)** to run LangChain.js applications.

#### Check if Node.js is installed:

```bash
node --version
```

If you see an LTS version number (visit [nodejs.org](https://nodejs.org/en/download) to check), you're good! Skip to Step 2.

#### Install Node.js:

1. Visit [nodejs.org](https://nodejs.org/)
2. Follow the install instructions for your operating system
3. Verify installation:

```bash
node --version  # Displays LTS version
npm --version # Displays npm version
```

**Why LTS?** Stable, production-ready, and receives security updates.

---

### Step 2: Clone the Repository

```bash
# Clone the course repository
git clone https://github.com/microsoft/langchainjs-for-beginners

# Navigate to the project
cd langchainjs-for-beginners

# Install dependencies
npm install

# Install tsx globally
npm install -g tsx
```

This will install all required packages including:
- `@langchain/openai` - OpenAI-compatible model integration (used in all chapters)
- `@langchain/core` - Core LangChain functionality
- `langchain` - Main LangChain package with additional utilities
- `dotenv` - Environment variable management for API keys

#### Why install tsx globally?

**tsx** lets you run `.ts` files directly without compiling first.

**Comparison**:
```bash
# Without tsx: compile then run
tsc myfile.ts && node myfile.js

# With tsx: run directly
tsx myfile.ts
```

**Benefits**: Faster development, simpler workflow, no build step needed. Throughout this course, you'll run examples using `tsx filename.ts`.

---

## Set Up Microsoft Foundry

This course uses **Microsoft Foundry** for AI models. You can follow the steps below or visit the [Deploy an Azure OpenAI model quickstart](https://learn.microsoft.com/azure/ai-foundry/quickstarts/get-started-code?tabs=azure-ai-foundry).

While the course is designed for Microsoft Foundry, you can use any OpenAI-compatible provider. If you choose a different provider, you'll still need an API key and endpoint URL.

### 1. Create a Microsoft Foundry Project

1. Visit the [Microsoft Foundry portal](https://ai.azure.com/)
2. Sign in with your Azure account
3. Click **+ New project**
4. Fill in the project details:
   - **Project name**: `langchain-course` (or your preferred name)
   - **Subscription**: Select your Azure subscription
   - **Resource group**: Create new or select existing
   - **Region**: Choose a region close to you (e.g., East US, West Europe)
5. Click **Create** (the portal will automatically set up the necessary resources)

### 2. Deploy Required Models

You'll need to deploy three models for this course:

**Deploy gpt-5-mini & gpt-5 (Chat Models):**

1. In your project, go to **Models + endpoints** in the left navigation
2. Click **+ Deploy model** → **Deploy base model**
3. Search for and select **gpt-5-mini**
4. Click **Confirm**
5. Configure deployment:
   - **Deployment name**: `gpt-5-mini` (keep this name for consistency)
   - **Model version**: Select the latest available
   - **Deployment type**: Global Standard
   - Click **Deploy**
6. Wait for deployment to complete
7. Follow the same process and deploy `gpt-5` as well. Note that you may have to complete a form to request access to `gpt-5` if it's not immediately available to deploy.

> [!NOTE]
> If you cannot deploy `gpt-5`, use **`gpt-4.1`** as a fallback. It is available in Microsoft Foundry and uses the same OpenAI-compatible API. Keep the deployment name `gpt-4.1`, then use that name in the comparison example.

> **Why deploy both chat models?** `gpt-5-mini` is used throughout the course for most examples (it's faster and more cost-effective). `gpt-5` (or `gpt-4.1` if `gpt-5` is unavailable) is used in Chapter 1 for model comparison exercises to demonstrate the performance and capability differences between models.

**Deploy Text Embedding Model:**

1. Click **+ Deploy model** → **Deploy base model** again
2. Search for and select **text-embedding-3-small**
3. Click **Confirm**
4. Configure deployment:
   - **Deployment name**: `text-embedding-3-small` (keep this name)
   - **Model version**: Select the latest available
   - **Deployment type**: Global Standard
   - Click **Deploy**
5. Wait for deployment to complete

### 3. Get Your Configuration Values

After deploying your models, you need two pieces of information:

1. **API Key**:
   - In your project, go to **Overview** in the left navigation
   - Find **Endpoints and keys**
   - Locate your **API Key**

2. **Endpoint URL**:
   - Locate the **Azure OpenAI** → **Azure OpenAI endpoint** value (looks like: `https://your-resource.openai.azure.com`)

### Why Microsoft Foundry?

- ✅ **Production-ready**: Enterprise-grade infrastructure and SLAs
- ✅ **Higher limits**: More requests per minute than free tiers
- ✅ **Additional features**: Private endpoints, content filtering, monitoring
- ✅ **Azure integration**: Works seamlessly with other Azure services

---

## Configure Environment Variables

#### Create `.env` file:

**Mac, Linux, WSL on Windows, or GitHub Codespaces:**

```bash
cp .env.example .env
```

**Windows Command Prompt:**

```bash
# Windows Command Prompt
copy .env.example .env

# Windows PowerShell
Copy-Item .env.example .env
```

#### Edit `.env` file:

Open `.env` in your text editor and add your Microsoft Foundry credentials. Add `/openai/v1` to the end of your endpoint URL.

```bash
AI_API_KEY=your_microsoft_foundry_api_key
AI_ENDPOINT=https://your-resource.openai.azure.com/openai/v1
AI_MODEL=gpt-5-mini
AI_EMBEDDING_MODEL=text-embedding-3-small
```

**Replace the API key and endpoint with the values from your Microsoft Foundry project.**

---

## Test Your Setup

Let's verify everything works!

#### Run the test:

Run the following command in your terminal from the root of the project:

```bash
tsx scripts/test-setup.ts
```

#### Expected output:

```
🚀 Testing AI provider connection...

✅ SUCCESS! Your AI provider is working!
   Provider: https://your-resource.openai.azure.com/openai/v1
   Model: gpt-5-mini

Model response: Setup successful!

🎉 You're ready to start the course!
```

If you see this, you're all set! If not, check the [troubleshooting](#troubleshooting) section below.

---

## Install VS Code (Recommended)

While you can use any text editor, we recommend **Visual Studio Code** for the best experience. Skip this step if you are using GitHub Codespaces.

#### Install VS Code:

1. Visit [code.visualstudio.com](https://code.visualstudio.com/)
2. Download for your OS
3. Install and launch VS Code

## ✅ Setup Checklist

Before starting the course, make sure you have:

- [ ] Node.js LTS installed (local development) or a Codespace ready
- [ ] Project cloned and dependencies installed (`npm install`) if working locally
- [ ] tsx installed globally (`npm install -g tsx`) if working locally
- [ ] Microsoft Foundry project created with `gpt-5-mini`, `gpt-5`, and `text-embedding-3-small` deployed
- [ ] `.env` file configured with your Microsoft Foundry API key, endpoint, and model names
- [ ] Test script runs successfully
- [ ] VS Code installed (optional but recommended for local development)

---

## 🎯 What's Next?

You're all set! Time to build your first AI application.

**👉 Continue to [Introduction to LangChain.js](../01-introduction/README.md)**

---

## 📚 Additional Resources

- [Microsoft Foundry Documentation](https://learn.microsoft.com/azure/ai-foundry/)
- [Node.js Documentation](https://nodejs.org/docs/latest/api/)
- [Environment Variables Best Practices](https://www.npmjs.com/package/dotenv)

---

## 🗺️ Navigation

[Back to Main](../README.md) | [Next: Introduction to LangChain.js →](../01-introduction/README.md)

---

## 🐛 Troubleshooting

### Issue: "Cannot find module '@langchain/openai'"

**Solution**: Run `npm install` in the project directory

### Issue: "AI_API_KEY not found" or "AI_ENDPOINT not found"

**Solutions**:
1. Make sure `.env` file exists in the project root
2. Check that `.env` contains all required variables:
   - `AI_API_KEY=your_key`
   - `AI_ENDPOINT=your_endpoint_url`
   - `AI_MODEL=gpt-5-mini`
   - `AI_EMBEDDING_MODEL=text-embedding-3-small`
3. No quotes needed around the values
4. No spaces before or after the `=`

### Issue: "401 Unauthorized" or "Invalid API key"

**Solutions**:
1. Copy a fresh API key from your Microsoft Foundry project
2. Make sure you copied the entire key
3. Confirm `AI_ENDPOINT` includes `/openai/v1` at the end
4. Check for extra spaces in the `.env` file

### Issue: Rate limit errors

**Solution**: Microsoft Foundry deployments have rate limits. If you hit them:
- Wait a few minutes and retry
- Check your deployment quota in the Microsoft Foundry portal
- Use `gpt-5-mini` for most examples to stay within limits

---

## 💬 Questions?

If you get stuck or have any questions about building AI apps, join:

[![Microsoft Foundry Discord](https://img.shields.io/badge/Discord-Microsoft_Foundry_Community_Discord-blue?style=for-the-badge&logo=discord&color=5865f2&logoColor=fff)](https://aka.ms/foundry/discord)

If you have product feedback or errors while building visit:

[![Microsoft Foundry Developer Forum](https://img.shields.io/badge/GitHub-Microsoft_Foundry_Developer_Forum-blue?style=for-the-badge&logo=github&color=000000&logoColor=fff)](https://aka.ms/foundry/forum)

If you run into issues with the course materials, please open an issue in the GitHub repo:

[![Course Issues](https://img.shields.io/badge/GitHub-LangChain.js_for_Beginners_Issues-blue?style=for-the-badge&logo=github&color=green&logoColor=fff)](https://github.com/microsoft/langchainjs-for-beginners/issues)
