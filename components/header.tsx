import Head from 'next/head';

const vulspa_description = "Vulspa bot is a Destiny 2 Discord bot that responds to your fireteam's call-outs and can help teach you raid encounters while you play them.";
const vulspa_logo_url = "https://vulspa-io.herokuapp.com/images/vulspalogo.png";
const vulspa_twitter = "@vulspa";

const Header = ({ title }) => {
    return (<Head>
        <title>{title}</title>
        <link rel="icon" href="/favicons/favicon.svg" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="description" content={vulspa_description} />
        <meta name="keywords" content="vulspa, vulspa bot, vulspa discord, vulspa destiny, discord, destiny, destiny 2" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* Open Graph Data */}
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://vulspa-io.herokuapp.com" />
        <meta property="og:image" content={vulspa_logo_url} />
        <meta property="og:description" content={vulspa_description} />

        {/*Twitter Card data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={vulspa_twitter} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={vulspa_description} />
        <meta name="twitter:creator" content="@henhen724" />
        {/* Twitter summary card with large image must be at least 280x150px */}
        <meta name="twitter:image:src" content={vulspa_logo_url} />

    </Head>)
}

export default Header;