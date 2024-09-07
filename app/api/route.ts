import { NextRequest, NextResponse } from 'next/server'
import { verifyAndExchangeAuthCode } from '@/actions'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { grant_type, code, client_id, client_secret } = body

  if (grant_type !== 'authorization_code') {
    return NextResponse.json({ error: 'Unsupported grant type' }, { status: 400 })
  }

  try {
    const tokenResponse = await verifyAndExchangeAuthCode(code, client_id, client_secret)
    return NextResponse.json(tokenResponse)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to exchange auth code' }, { status: 400 })
  }
}