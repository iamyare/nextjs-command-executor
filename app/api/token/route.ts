import { NextRequest, NextResponse } from 'next/server'
import { verifyAndExchangeAuthCode, debugLog } from '@/actions'

export async function POST(request: NextRequest) {
  let grantType, code, clientId, clientSecret, redirectUri;

  // Check content type and parse body accordingly
  const contentType = request.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const body = await request.json();
    ({ grant_type: grantType, code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri } = body);
    //debugLog de todo el body
    await debugLog('info', 'Token request received body', body)
  } else {
    const body = await request.formData();
    grantType = body.get('grant_type')?.toString();
    code = body.get('code')?.toString();
    clientId = body.get('client_id')?.toString();
    clientSecret = body.get('client_secret')?.toString();
    redirectUri = body.get('redirect_uri')?.toString();
    //debugLog de todo el body
    await debugLog('info', 'Token request received body', body)
  }

  await debugLog('info', 'Token request received', {  grantType, code, clientId, redirectUri })

  if (grantType !== 'authorization_code') {
    await debugLog('error', 'Unsupported grant type', { grantType })
    return NextResponse.json({ error: 'unsupported_grant_type' }, { status: 400 })
  }

  if (!code || !clientId || !clientSecret || !redirectUri) {
    await debugLog('error', 'Missing required parameters', { code, clientId, redirectUri, clientSecret })
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  try {
    const tokenResponse = await verifyAndExchangeAuthCode({ code, clientId, clientSecret, redirectUri })
    await debugLog('info', 'Token exchange successful', { code })
    return NextResponse.json(tokenResponse)
  } catch (error) {
    await debugLog('error', 'Failed to exchange auth code', { code, error: (error as Error).message })
    return NextResponse.json({ error: 'invalid_grant' }, { status: 400 })
  }
}