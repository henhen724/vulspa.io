import Head from 'next/head';
import navbar from '../components/navbar';
import { Component } from 'react';

//Defining some keycodes we need
const KEYCODES = {
  tab: 9,
  enter: 13,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  f5: 116,
  f6: 117,
  f7: 118,
  f8: 119
}

class Command {
  username: string;
  input: string;
  constructor(_username: string, _input: string) {
    this.username = _username;
    this.input = _input;
  }
}

class Home extends Component<{}, { username: string, prevCMDs: Command[], currentCMD: string }> {
  constructor(props: Object) {
    super(props);
    this.state = {
      username: "GUEST",
      prevCMDs: [],
      currentCMD: ""
    };
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  submitTerminal = () => {
    console.log("enter pressed");
    this.setState({
      ...this.state,
      prevCMDs: [new Command(this.state.username, this.state.currentCMD)].concat(this.state.prevCMDs),
      currentCMD: ""
    });
    console.log(this.state.prevCMDs)
  }

  prevCommand = () => {
    console.log("UP pressed");
  }

  nextCommand = () => {
    console.log("down pressed");
  }

  handleKeydown = e => {
    switch (e.keyCode) {
      case KEYCODES.enter:
        this.submitTerminal();
        break;
      case KEYCODES.up:
        this.prevCommand();
        break;
      case KEYCODES.down:
        this.nextCommand();
        break;
      default:
        break;
    }
  }

  handleTerminalInput = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      currentCMD: e.target.value
    })
  }

  render() {
    return (<div>
      <Head>
        <title>Vulspa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {navbar()}
      <main className="container-fluid mt-4 main h-100">
        {this.state.prevCMDs.map((CMD, index) => {
          console.log("Printing " + CMD.input);
          return (<div>
            <span>{CMD.username + "@VULSPA>"}</span><input className="container bg-dark border-0 text-light terminal" type="text" id={index.toString()} spellCheck="false" value={CMD.input} />
          </div>)
        })}
        <span>{this.state.username + "@VULSPA>"}</span><input className="container bg-dark border-0 text-light terminal" type="text" spellCheck="false" value={this.state.currentCMD} onChange={this.handleTerminalInput} />
      </main>
    </div >)
  }
}

export default Home;