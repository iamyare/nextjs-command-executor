import { NextRequest, NextResponse } from 'next/server'
import { verifyAndExchangeAuthCode, debugLog } from '@/actions'

export async function POST(request: NextRequest) {
  const body = await request.formData()
  const grantType = body.get('grant_type')?.toString()
  const code = body.get('code')?.toString()
  const clientId = body.get('client_id')?.toString()
  const clientSecret = body.get('client_secret')?.toString()
  const redirectUri = body.get('redirect_uri')?.toString()

  await debugLog('info', 'Token request received', { grantType, code, clientId, redirectUri })

  if (grantType !== 'authorization_code') {
    await debugLog('error', 'Unsupported grant type', { grantType })
    return NextResponse.json({ error: 'unsupported_grant_type' }, { status: 400 })
  }

  if (!code || !clientId || !clientSecret || !redirectUri) {
    await debugLog('error', 'Missing required parameters', { code, clientId, clientSecret, redirectUri })
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  try {
    const tokenResponse = await verifyAndExchangeAuthCode({ clientId, clientSecret, code, redirectUri })
    await debugLog('info', 'Token exchange successful', { code })
    return NextResponse.json(tokenResponse)
  } catch (error) {
    await debugLog('error', 'Failed to exchange auth code', { code, error: (error as Error).message })
    return NextResponse.json({ error: 'invalid_grant' }, { status: 400 })
  }
}