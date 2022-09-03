import Header from '../../components/Header';
import DiscordOAuthButton from '../../components/DiscordOAuthButton';

interface SignInProps {
    DISCORD_BOT_CLIENT_ID: string,
    ROOT_URI: string
}

function SignIn(props: SignInProps) {
    console.log(props)
    return (
        <div className="container bg-info text-center border mt-4">
            <Header title="Vulspa Sign In" />
            <h1>VULSPA ACCESS</h1>
            <DiscordOAuthButton DISCORD_BOT_CLIENT_ID={props.DISCORD_BOT_CLIENT_ID} ROOT_URI={props.ROOT_URI} />
        </div>
    )
}

export function getServerSideProps(ctx) {
    return { props: { DISCORD_BOT_CLIENT_ID: process.env.DISCORD_BOT_CLIENT_ID, ROOT_URI: process.env.ROOT_URI } }
}

export default SignIn