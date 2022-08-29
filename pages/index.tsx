import Header from '../components/header';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { useCallback } from 'react';
import IntroEffectParams from '../public/particle-effects/intro.json';

const Intro = () => {
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);


    return (<><Header title="Vulspa" />
        <div className="container bg-info text-center border mt-4 pb-2">
            This is a companion website to the Vulspa discord bot.  To see details on the bot itself you can head to its <a href="https://github.com/henhen724/Vulspa">GitHub page</a>, or look at <a href="https://github.com/henhen724/Vulspa">the GitHub Page for this site.</a>  Both are currently under construction, so don't expect much.  If you'd like to get started anyway, you can <a href="/accounts/signup">create a vuslpa account right now.</a> If your interested in contributing code or beta testing, message @Vulspa on twitter or join the <a href="https://discord.gg/g4fcbJu">Vuslpa bot discord server.</a>
        </div>
        <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} height="100vh" width="100vw" className="intro-particles" params={IntroEffectParams} />
    </>)
}

export default Intro;