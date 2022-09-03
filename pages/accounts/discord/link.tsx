import DiscordOAuthButton from '../../../components/DiscordOAuthButton';
import { getTokenCookie } from '../../../lib/auth-cookies';

interface LinkDiscordProps {
    token: string,
    DISCORD_BOT_CLIENT_ID: string,
    ROOT_URI: string
}

const LinkDiscord = (props: LinkDiscordProps) => {
    return (
        <div className="container bg-info text-center border mt-4 pb-2">
            <h1>CONNECT VULSPA TO YOUR COMS CHANNEL</h1>
            <DiscordOAuthButton token={props.token} DISCORD_BOT_CLIENT_ID={props.DISCORD_BOT_CLIENT_ID} ROOT_URI={props.ROOT_URI} />
        </div>
    )
}

export async function getServerSideProps(ctx) {
    return { token: getTokenCookie(ctx.req), DISCORD_BOT_CLIENT_ID: process.env.DISCORD_BOT_CLIENT_ID, ROOT_URI: process.env.ROOT_URI }
}

export default LinkDiscord;