# Contributing to Cognify

To run Cognify locally, you need your own [Supabase](https://supabase.com/) project. Here's how to configure it:o run Cognify locally, you need your own [Supabase](https://supabase.com/) project. Here's how to configure it:tting Up Supabase for Local Development

To run Cognify locally, you need your own [Supabase](https://supabase.com/) project. Here's how to configure it:o run Cognify locally, you need your own [Supabase](https://supabase.com/) project. Here's how to configure it:o run Cognify locally, you need your own [Supabase](https://supabase.com/) project. Here's how to configure it:ome contributions! Please read the following guidelines to get started.

## How to Contribute

1. **Fork the repository** and create your branch from `main`.
2. **Create a new branch** for your feature or fix (do not commit directly to `main`).
3. **Install dependencies** if you haven't already.
4. **Set up your own `.env.local`**  
   Use your own Supabase project credentials and set `NEXT_PUBLIC_SITE_URL` to your local or deployed URL (e.g., `http://localhost:3000`).  
   **Do not use the official production URL unless you are deploying your own instance.**
5. **Make your changes** (add features, fix bugs, improve docs).
6. **Test your changes** locally. (If possible, also deploy a preview with Vercel to check for ESLint issues.)
7. **Commit your changes** with clear messages.
8. **Push to your fork** and submit a Pull Request.

## Code Style

- Use [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) for formatting and linting.
- Use [DaisyUI](https://daisyui.com/) or [Radix UI](https://www.radix-ui.com/) for UI components.
- Write clear, concise commit messages.
- Keep PRs focused and small when possible.

## Issues & Discussions

- Use [GitHub Issues](https://github.com/chaosweasl/cognify/issues) for bugs and feature requests.
- For questions or ideas, open a [Discussion](https://github.com/chaosweasl/cognify/discussions).

## Security

If you discover a security vulnerability, please report it privately.

## Setting Up Supabase for Local Development

To run Cognify locally, you need your own [Supabase](https://supabase.com/) project. Here’s how to configure it:

**Recommended:** Use [Vercel](https://vercel.com/) and Supabase together for the smoothest experience.  
You can link your Supabase project to your Vercel project and automatically pull environment variables using the [Vercel CLI](https://vercel.com/docs/cli).

### Quick Setup with Vercel + Supabase

1. **Deploy your fork to Vercel**

   - [Import your GitHub repo to Vercel](https://vercel.com/new).
   - During setup, you can link your Supabase project and Vercel will auto-populate your environment variables.

2. **Pull environment variables locally**
   - Install the Vercel CLI:
     ```sh
     npm i -g vercel
     ```
   - Log in and link your project:
     ```sh
     vercel login
     vercel link
     ```
   - Pull your environment variables:
     ```sh
     vercel env pull .env.local
     ```
   - Now your `.env.local` will have the correct Supabase keys and site URL.

### Manual Setup

1. **Create a Supabase project**  
   Go to [Supabase](https://app.supabase.com/) and create a new project.

2. **Get your API keys**

   - In your Supabase dashboard, go to **Project Settings → API**.
   - Copy the **Project URL** and **anon public key**.

3. **Configure authentication redirect URLs**

   - Go to **Authentication → URL Configuration**.
   - Set the **Site URL** to `http://localhost:3000` (or your local dev URL).
   - Add any additional redirect URLs you need (e.g., for Vercel previews).

4. **Update your `.env.local`**

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

5. **(Optional) Enable OAuth providers**

   - In **Authentication → Providers**, enable GitHub or other providers you want to test.
   - Set the callback/redirect URL to `http://localhost:3000/auth/callback`.

6. **(Optional) Update password/email settings**
   - In **Authentication → Settings**, you can adjust password requirements, email confirmations, etc., to match your needs.

For more details, see the [Supabase docs](https://supabase.com/docs/guides/auth).

## Troubleshooting

- **Email confirmation links go to the wrong URL:**  
  Make sure you have set the correct "Site URL" in your Supabase Auth settings. For local development, you may need to temporarily set it to `http://localhost:3000`.

- **OAuth not working locally:**  
  Double-check that your provider callback URLs are set to your local dev URL in Supabase.

If you get stuck, open a [Discussion](https://github.com/chaosweasl/cognify/discussions) or [Issue](https://github.com/chaosweasl/cognify/issues)!

---

Thank you for helping make Cognify better!
