interface OAuthProps {
    token?: string,
    DISCORD_BOT_CLIENT_ID: string,
    ROOT_URI: string
}

const DiscordOAuthButton = (props: OAuthProps) => {
    function makeDiscordUrl() {
        var state = 'NO_TOKEN';
        if (props.token)
            state = `TOKEN:${props.token}`;
        const data = {
            'client_id': props.DISCORD_BOT_CLIENT_ID,
            'response_type': 'code',
            'scope': 'identify email connections gdm.join',
            'redirect_uri': props.ROOT_URI + '/accounts/discord/landing',
            state
        }
        var discordOAuthParams = new URLSearchParams(data).toString()

        return 'https://discord.com/api/oauth2/authorize?' + discordOAuthParams;
    }
    return (
        <a className="btn btn-light" href={makeDiscordUrl()}>Connect Discord</a>
    )
}

export default DiscordOAuthButton;