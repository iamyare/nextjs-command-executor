import { NextRequest, NextResponse } from 'next/server'
import { linkAccount, getUser, debugLog } from '@/actions'

export async function POST(request: NextRequest) {
  const { authCode, redirectUri, state } = await request.json()
  
  await debugLog('info', 'Link account request received', { authCode, redirectUri, state })

  if (!authCode || !redirectUri || !state) {
    await debugLog('error', 'Missing authCode, redirectUri, or state', { authCode, redirectUri, state })
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  try {
    const { data: { user } } = await getUser()
    if (!user) {
      await debugLog('error', 'User not authenticated')
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
    }

    await linkAccount({ authCode, userId: user.id, redirectUri })

    const alexaRedirectUrl = `${redirectUri}?code=${authCode}`
    await debugLog('info', 'Redirecting to Alexa', { alexaRedirectUrl })
    return NextResponse.json({ redirect: alexaRedirectUrl })
  } catch (error) {
    await debugLog('error', 'Failed to link account', { error: (error as Error).message })
    return NextResponse.json({ error: 'Failed to link account' }, { status: 500 })
  }
}