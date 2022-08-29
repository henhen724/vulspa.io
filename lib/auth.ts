import Iron from '@hapi/iron';
import AdminInfo, { Permissions } from '../models/AdminInfo';
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth-cookies';
import User from '../models/User';

const TOKEN_SECRET = process.env.TOKEN_SECRET

export async function setLoginSession(res, session) {
    const createdAt = Date.now()
    const obj = { ...session, createdAt, maxAge: MAX_AGE }
    const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)

    setTokenCookie(res, token)
}

export async function getLoginSessionFromToken(token) {
    const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
    const expiresAt = session.createdAt + session.maxAge * 1000

    if (Date.now() < expiresAt) {
        return session
    }
    return null
}

export async function getLoginSessionFromReq(req) {
    const token = getTokenCookie(req);

    if (!token) return;

    return getLoginSessionFromToken(token);
}

export async function getPermissions(req) {
    const session = await getLoginSessionFromReq(req);
    const admin = await AdminInfo.findOne({ id: session.id });
    if (admin) {
        return admin.permission_level;
    }
    else {
        return Permissions.non_admin;
    }
}