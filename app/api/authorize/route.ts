import { NextRequest, NextResponse } from 'next/server'
import { createAuthCode } from '@/actions'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const clientId = searchParams.get('client_id')
  const redirectUri = searchParams.get('redirect_uri')
  const state = searchParams.get('state')

  if (!clientId || !redirectUri || !state) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  try {
    const authCode = await createAuthCode(clientId, redirectUri, state)
    // Redirigir al usuario a la página principal con parámetros de Alexa
    const loginUrl = `/?auth_code=${authCode}&redirect_uri=${encodeURIComponent(redirectUri)}&alexa_auth=true`
    return NextResponse.redirect(new URL(loginUrl, request.url))
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create auth code' }, { status: 500 })
  }
}