import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://paideia-chaosweasl.vercel.app';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/'
  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/'
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Use the environment variable for the site URL
      return NextResponse.redirect(`${SITE_URL}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${SITE_URL}/auth/auth-code-error`)
}