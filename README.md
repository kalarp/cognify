# Cognify

**Cognify** is an open-source platform that helps you turn your notes into flashcards using AI, and reminds you to restudy them using spaced repetition. You control your data and your AI: bring your own API key, and Cognify will never lock you in or charge you for usage.

## Features

- ✨ **AI-Powered Flashcard Generation**: Automatically extract key concepts from your notes and generate targeted flashcards.
- 📄 **Multiple Input Formats**: Upload text, paste content, or upload PDF files.
- 🗄️ **Personal Study Database**: All flashcards are stored securely for your account.
- 🔑 **Your Own API**: Use your own AI API key (OpenAI, etc.) for privacy and control.
- ⏰ **Spaced Repetition Reminders**: Get reminders to review your flashcards for optimal learning.
- 🔒 **Open Source & Self-Hostable**: 100% open-source, no vendor lock-in, no hidden fees.
- 🛡️ **User Authentication**: Secure sign-up, login, and user management.
- 🖼️ **User Profiles**: Upload profile pictures, change usernames, and manage your account.
- 🌐 **OAuth Support**: Sign in with Google, GitHub, and more.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Supabase](https://supabase.com/) account (for authentication and database)
- An AI API key (e.g., OpenAI). You can also test with a local model using LMStudio or any other local AI (not recommended for actually creating flashcards)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/chaosweasl/cognify.git
   cd cognify
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory:

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

4. **Run the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Update Supabase Authentication Settings:**

   In your [Supabase](https://supabase.com/) project dashboard, go to **Authentication → URL Configuration**.  
   Set the **Site URL** to `http://localhost:3000` (or the URL you use for local testing).  
   This ensures authentication redirects work correctly during development.

6. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure

```
app/                # Next.js app directory (routes, pages, layouts)
components/         # React components
utils/              # Utility functions (Supabase client, helpers)
public/             # Static assets
docs/               # Documentation and TODOs
```

## Roadmap

- [x] Email/password authentication
- [ ] OAuth login (Google, GitHub, etc.)
- [ ] User profile management (avatars, usernames)
- [ ] Flashcard creation and storage
- [ ] AI-powered flashcard generation (bring your own API key)
- [ ] PDF parsing and import
- [ ] Spaced repetition reminders
- [ ] Mobile-friendly UI
- [ ] Community/shared decks

See [`docs/todo.md`](docs/todo.md) for more details.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for guidelines and tutorials on how to contribute.

## License

[MIT](LICENSE)

---

**Cognify** is built to empower learners everywhere. You own your data, your AI, and your learning journey.

You can watch live development at [https://cognify-chaosweasl.vercel.app/](https://cognify-chaosweasl.vercel.app/)
