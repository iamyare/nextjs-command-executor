import { NextRequest, NextResponse } from 'next/server'
import { verifyAndExchangeAuthCode, debugLog } from '@/actions'

export async function POST(request: NextRequest) {
  let grantType, code, clientId, clientSecret, redirectUri;
  let rawBody;

  // Log the raw body content
  const contentType = request.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    rawBody = await request.json();
    await debugLog('info', 'Raw JSON body received', { rawBody });
    ({ grant_type: grantType, code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri } = rawBody);
  } else {
    const formData = await request.formData();
    rawBody = Object.fromEntries(formData);
    await debugLog('info', 'Raw form data received', { rawBody });
    grantType = formData.get('grant_type')?.toString();
    code = formData.get('code')?.toString();
    clientId = formData.get('client_id')?.toString();
    clientSecret = formData.get('client_secret')?.toString();
    redirectUri = formData.get('redirect_uri')?.toString();
  }

  await debugLog('info', 'Token request received', { grantType, code, clientId, redirectUri })

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