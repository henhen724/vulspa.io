import Head from 'next/head';
import navbar from '../components/navbar';

export default function Home() {
  return (<div>
    <Head>
      <title>Vulspa</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {navbar()}
    <main className="container-fluid mt-4">
      <div className="row">
        <div className="col h-80 ml-4 mr-4 text-center bg-primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet, nisi sed ullamcorper auctor, ligula sapien cursus justo, vel porta turpis urna in magna. Donec eu purus eros. Mauris pellentesque feugiat eleifend. Quisque fermentum, orci nec rhoncus aliquam, lacus erat vehicula elit, at tincidunt nisi libero a nunc. Mauris quis magna felis. Proin elit nisi, euismod eu pretium pharetra, pretium vitae magna. Mauris ullamcorper sem eros, sed facilisis nunc sollicitudin vel. Nam ligula mi, euismod laoreet blandit in, pretium sit amet tortor. Cras sed risus nulla.</div>
        <div className="col h-80 ml-4 mr-4 text-center bg-primary">Maecenas consectetur ante tortor, quis dictum orci eleifend vitae. Ut nec massa ut arcu faucibus tempus nec ut diam. Praesent sit amet libero molestie, mattis est ut, tempor neque. Pellentesque auctor nibh pulvinar massa rutrum suscipit nec ac mauris. Etiam vestibulum maximus magna et aliquam. Aenean hendrerit consequat leo id imperdiet. Mauris bibendum dui lacus, id dapibus ante volutpat efficitur. Aenean eget rutrum nibh. Vestibulum nec semper dui. Ut a consectetur enim. Cras faucibus felis ut eros semper molestie. Praesent semper rhoncus massa, quis dignissim mi congue semper. Aliquam rhoncus, lorem vitae rhoncus sagittis, purus nibh luctus lacus, a feugiat lacus ligula id urna.</div>
        <div className="col h-80 ml-4 mr-4 text-center bg-primary">Pellentesque et diam tincidunt, maximus urna id, volutpat sapien. Nullam sit amet elit ac sapien pretium sollicitudin. Nulla eu dictum sem. Ut imperdiet lorem sit amet turpis scelerisque, eget dignissim lectus blandit. Donec mollis pulvinar risus, at pretium erat dignissim non. Aenean elementum turpis in egestas pulvinar. Nam vestibulum faucibus accumsan. Proin posuere convallis lobortis. Nunc hendrerit magna vel ipsum sagittis gravida. Sed sagittis ac tellus id vehicula. Proin imperdiet nunc vitae est interdum, in faucibus risus posuere.</div>
      </div>
    </main>
  </div>)
}
