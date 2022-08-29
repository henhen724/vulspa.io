import { useRouter } from 'next/router';
import { getTokenCookie } from '../../../lib/auth-cookies';

const LinkBungie = ({ token }) => {
    const router = useRouter()
    function makeBungieUrl() {
        if (!token)
            token = 'NO_TOKEN'
        const data = {
            'client_id': process.env.BUNGIE_CLIENT_ID,
            'response_type': 'code',
            'redirect_uri': process.env.ROOT_URI + '/accounts/bungie/landing',
        }
        var bungieOAuthParams = new URLSearchParams(data).toString()

        return 'https://www.bungie.net/en/OAuth/Authorize?' + bungieOAuthParams;
    }
    return (
        <div className="container bg-info text-center border mt-4 pb-2">
            <h1>CONNECT VULSPA TO YOUR COMS CHANNEL</h1>
            <a className="btn btn-light" href={makeBungieUrl()}>Connect Bungie</a>
        </div>
    )
}

LinkBungie.getInitialProps = async (ctx) => {
    return { token: getTokenCookie(ctx.req) }
}

export default LinkBungie;