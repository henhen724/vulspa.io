import { serialize, parse } from 'cookie'; // Serialize formats token into a cookie parse turns the cookie into the token

export const MAX_AGE = 60 * 60 * 8;

export function setTokenCookie(res, token) {
    const cookie = serialize(process.env.TOKEN_NAME, token, {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 100), // I don't understand why this is set to 100 times the max age but its what the example said to do
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    })

    res.setHeader('Set-Cookie', cookie);
}

export function removeTokenCookie(res) {
    const cookie = serialize(process.env.TOKEN_NAME, '', {
        maxAge: -1,
        path: '/',
    })

    res.setHeader('Set-Cookie', cookie);
}

export function parseCookies(req) {
    if (req.cookies) return req.cookies;

    const cookie = req.header?.cookie;
    return parse(cookie || '');
}

export function getTokenCookie(req) {
    const cookies = parseCookies(req);
    return cookies[process.env.TOKEN_NAME];
}