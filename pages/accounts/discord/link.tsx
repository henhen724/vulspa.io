import { useRouter } from 'next/router';
import { getTokenCookie } from '../../../lib/auth-cookies';

const LinkDiscord = ({ token }) => {
    const router = useRouter()
    function makeDiscordUrl() {
        if (!token)
            token = 'NO_TOKEN'
        const data = {
            'client_id': process.env.DISCORD_BOT_CLIENT_ID,
            'response_type': 'code',
            'scope': 'identify email connections gdm.join',
            'redirect_uri': process.env.ROOT_URI + '/accounts/discord/landing',
            'state': token
        }
        var discordOAuthParams = new URLSearchParams(data).toString()

        return 'https://discord.com/api/oauth2/authorize?' + discordOAuthParams;
    }
    return (
        <div className="container bg-info text-center border mt-4 pb-2">
            <h1>CONNECT VULSPA TO YOUR COMS CHANNEL</h1>
            <a className="btn btn-light" href={makeDiscordUrl()}>Connect Discord</a>
        </div>
    )
}

LinkDiscord.getInitialProps = async (ctx) => {
    return { token: getTokenCookie(ctx.req) }
}

export default LinkDiscord;