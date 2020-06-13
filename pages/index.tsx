import Head from 'next/head';
import navbar from '../components/navbar';
import { Component } from 'react';
import 'isomorphic-fetch';

//Defining some keycodes we need for the user controls
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
  rslt: string;
  constructor(_username: string, _input: string) {
    this.username = _username;
    this.input = _input;
    this.rslt = '';
  }
  run() {
    return new Promise((accept, reject) => {
      fetch('/api/commands', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ command: this.input })
      }).then(res => {
        return res.json(); //Whats happening is .json() itself returns a promise so that fetch can return packets with large bodies as a stream.
      }).catch(err => {
        console.log("Command error:", err, "\nFor the command:", this.input, "\nUser:", this.username);
        return new Promise(accept => {
          accept({ msg: "This is is an internal site error.  See error message in console.\n" })
        });
      }).then(body => {
        this.rslt = body.msg;
        console.log("CMD: ", this.input, "RSLT: ", this.rslt);
        accept();
      })
    })
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
    var tmpCmds = this.state.prevCMDs;
    const CMD = new Command(this.state.username, this.state.currentCMD);
    tmpCmds.push(CMD);
    CMD.run().then(() => {
      this.setState({
        ...this.state,
        prevCMDs: tmpCmds,
        currentCMD: ""
      }); // We want to wait to render this state only after the response is recieved from the API
    })
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
        <link rel="icon" href="/favicons/favicon.svg" />
      </Head>
      {navbar()}
      <main className="container-fluid mt-4 main h-100">
        {this.state.prevCMDs.map((CMD, index) => {
          console.log("Printing " + CMD.input);
          return (<div id={"Command-" + index.toString()}>
            <span>{CMD.username + "@VULSPA>"}</span><input className="container border-0 text-light terminal" type="text" spellCheck="false" value={CMD.input} readOnly={true} />
            <div id="Rslt">{CMD.rslt}</div>
          </div>)
        })}
        <div id="Command-input">
          <span>{this.state.username + "@VULSPA>"}</span><input className="container border-0 text-light terminal" type="text" spellCheck="false" value={this.state.currentCMD} onChange={this.handleTerminalInput} />
        </div>
      </main>
    </div >)
  }
}

export default Home;