import { serialize, parse } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const TOKEN_NAME: string = 'token'

export const MAX_AGE: number = 60 * 60 * 8 // 8 hours

export const setTokenCookie = (res: NextApiResponse, token) => {
  const cookie = serialize(TOKEN_NAME, token, {
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    maxAge: MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  res.setHeader('Set-Cookie', cookie)
}

export const removeTokenCookie = (res: NextApiResponse) => {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
}

export const parseCookies = (req: NextApiRequest) => {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie

  return parse(cookie || '')
}

export function getTokenCookie(req: NextApiRequest) {
  const cookies = parseCookies(req)

  return cookies[TOKEN_NAME]
}
