import { Component } from 'react';

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
            this.rslt = 'GraphQL query is unimplimented. So this doesn\'t work yet';
            accept();
        })
    }
}

class Terminal extends Component<{}, { username: string, prevCMDs: Command[], currentCMD: string }> {
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
        return (<div className="container-fluid mt-2 main">
            {this.state.prevCMDs.map((CMD, index) => {
                return (<div key={"Command-" + index.toString()}>
                    <span>{CMD.username + "@VULSPA>"}</span><input className="container border-0 text-light terminal" type="text" spellCheck="false" value={CMD.input} readOnly={true} />
                    <div id="Rslt">{CMD.rslt}</div>
                </div>)
            })}
            <div id="Command-input">
                <span>{this.state.username + "@VULSPA>"}</span><input className="container border-0 text-light terminal" type="text" spellCheck="false" value={this.state.currentCMD} onChange={this.handleTerminalInput} />
            </div>
        </div>)
    }
}

export default Terminal;