---
title: Getting Started
layout: default
nav_order: 3
---

## Getting Started

### Prerequisites

You will need the following tools to run Cognify:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/) (for package management)
- [Supabase](https://supabase.com/) account (for authentication and database)
- An AI API key (e.g., OpenAI). You can also test with a local model using LMStudio or any other local AI (not recommended for actually creating flashcards)

### Installation

Follow the following steps to install Cognify: 

1. Clone the repository: 

   ```sh
   git clone https://github.com/chaosweasl/cognify.git
   cd cognify
   ```

2. Install dependencies: 

   ```sh
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables by creating a `.env.local` file in the root directory: 

    ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   # Or set to your deployed URL if not running locally
   # Add your AI API key as needed
   ```

   > **Note:**  
   > Do **not** use `https://cognify-chaosweasl.vercel.app` unless you are deploying to the official instance.  
   > Use your own local or deployment URL for `NEXT_PUBLIC_SITE_URL`.

4. Run the development server: 

   ```sh
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
5. Update Supabase Authentication Settings: 

    In your [Supabase](https://supabase.com/) project dashboard, go to **Authentication → URL Configuration**.  
    Set the **Site URL** to `http://localhost:3000` (or the URL you use for local testing). This ensures authentication redirects work correctly during development.

6. Open [http://localhost:3000](http://localhost:3000) in your browser.
