import { NextRequest, NextResponse } from 'next/server'
import { verifyAndExchangeAuthCode, debugLog } from '@/actions'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { grant_type, code, client_id, client_secret } = body

  await debugLog('info', 'Token request received', { grant_type, code, client_id })

  if (grant_type !== 'authorization_code') {
    await debugLog('error', 'Unsupported grant type', { grant_type })
    return NextResponse.json({ error: 'Unsupported grant type' }, { status: 400 })
  }

  try {
    const tokenResponse = await verifyAndExchangeAuthCode(code, client_id, client_secret)
    await debugLog('info', 'Token exchange successful', { code })
    return NextResponse.json(tokenResponse)
  } catch (error) {
    await debugLog('error', 'Failed to exchange auth code', { code, error: (error as Error).message  })
    return NextResponse.json({ error: 'Failed to exchange auth code' }, { status: 400 })
  }
}