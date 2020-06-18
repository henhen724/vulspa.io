import Header from '../components/header';

const Intro = () => {
    return <div className="container bg-info text-center border mt-4 pb-2">
        <Header title="Vulspa" />
        This is a companion website to the Vulspa discord bot.  To see details on the bot itself you can head to its <a href="https://github.com/henhen724/Vulspa" className="text-dark bg-light">GitHub page</a>, or look at <a href="https://github.com/henhen724/Vulspa" className="text-dark bg-light">the GitHub Page for this cite.</a>  Both are currently under construction, so don't expect much.  If you'd like to get started anyway, you can <a href="/accounts/signup" className="text-dark bg-light">create a vuslpa account right now.</a> If your interested in contributing code or beta testing, message @Vulspa on twitter or join the <a href="https://discord.gg/g4fcbJu" className="text-dark bg-light">Vuslpa bot discord server.</a></div>
}

export default Intro;