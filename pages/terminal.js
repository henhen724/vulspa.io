import { Component } from 'react';
import { withRouter } from 'next/router';

class Terminal extends Component {
    render() {
        return (<div className="background-color-wraper">
            <div className="container">
                <h1 className="title">Vulspa</h1>
                <img src="/vulspalogo.svg" alt="Vulspa Logo" className="logo" />
            </div>
            <style jsx>{`
        .title{
            color:#fff;
            font-size: 32pt;
            text-align: center;
        }
        .logo{
            align-item: center;
        }
        .background-color-wraper{
            background-color: #202520;
            min-height: 100vh;
            min-width: 100vw;
            justify-content: center;
            align-items: center;
        }
      `}</style>
        </div>);
    }
}

export default withRouter(Terminal);