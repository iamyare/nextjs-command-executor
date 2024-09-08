import { NextRequest, NextResponse } from 'next/server'
import { createAuthCode } from '@/actions'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const clientId = searchParams.get('client_id')
  const redirectUri = searchParams.get('redirect_uri')
  const state = searchParams.get('state')
  const responseType = searchParams.get('response_type')
  const scope = searchParams.get('scope')


  if (!clientId || !redirectUri || !state || responseType !== 'code') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const authCode = await createAuthCode({ clientId, redirectUri, state, scope })
    const loginUrl = `/?auth_code=${authCode}&redirect_uri=${encodeURIComponent(redirectUri)}&alexa_auth=true&state=${encodeURIComponent(state)}`
    return NextResponse.redirect(new URL(loginUrl, request.url))
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create auth code' }, { status: 500 })
  }
}