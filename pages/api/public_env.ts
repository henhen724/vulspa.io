const public_env = async (req, res) => {
    return res.status(200).json({
        DISCORD_BOT_CLIENT_ID: process.env.DISCORD_BOT_CLIENT_ID,
        BUNGIE_CLIENT_ID: process.env.BUNGIE_CLIENT_ID,
        ROOT_URI: process.env.ROOT_URI
    });
}

export default public_env;