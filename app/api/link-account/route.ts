import { NextRequest, NextResponse } from 'next/server'
import { linkAccount, getUser } from '@/actions'

export async function POST(request: NextRequest) {
  const { authCode, redirectUri, state } = await request.json()
  

  if (!authCode || !redirectUri || !state) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  try {
    const { data: { user } } = await getUser()
    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
    }

    await linkAccount({ authCode, userId: user.id, redirectUri })

    const alexaRedirectUrl = `${redirectUri}?code=${authCode}`
    return NextResponse.json({ redirect: alexaRedirectUrl })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to link account' }, { status: 500 })
  }
}