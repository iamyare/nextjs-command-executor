import { NextRequest, NextResponse } from 'next/server'
import { linkAccount, getUser, debugLog } from '@/actions'

export async function POST(request: NextRequest) {
  const { authCode, redirectUri } = await request.json()
  
  await debugLog('info', 'Link account request received', { authCode, redirectUri })

  if (!authCode || !redirectUri) {
    await debugLog('error', 'Missing authCode or redirectUri', { authCode, redirectUri })
    return NextResponse.json({ error: 'Missing authCode or redirectUri' }, { status: 400 })
  }

  try {
    const { data: { user } } = await getUser()
    if (!user) {
      await debugLog('error', 'User not authenticated')
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
    }

    await linkAccount(authCode, user.id, redirectUri)

    const alexaRedirectUrl = `${redirectUri}?code=${authCode}&state=STATE`
    await debugLog('info', 'Redirecting to Alexa', { alexaRedirectUrl })
    return NextResponse.json({ redirect: alexaRedirectUrl })
  } catch (error) {
    await debugLog('error', 'Failed to link account', { error: error.message })
    return NextResponse.json({ error: 'Failed to link account' }, { status: 500 })
  }
}