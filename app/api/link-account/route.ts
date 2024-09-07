import { NextRequest, NextResponse } from 'next/server'
import { linkAccount } from '@/actions'

export async function POST(request: NextRequest) {
  const { authCode, userId } = await request.json()
  
  if (!authCode || !userId) {
    return NextResponse.json({ error: 'Missing authCode or userId' }, { status: 400 })
  }

  try {
    await linkAccount(authCode, userId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.log('Link Account: ', error)
    return NextResponse.json({ error: 'Failed to link account' }, { status: 500 })
  }
}