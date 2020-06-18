import { Component } from 'react';
import gql from 'graphql-tag';


class Profile extends Component<{ viewer: { name: String }, router: any }, {}> {
    constructor(props) {
        super(props);
    }

    handleSignOut = async (event) => {
        event.preventDefault();
        this.props.router.push('/accounts/signout');
    }

    render() {
        return (<div className="row">
            <div className="col">
                {this.props.viewer.name}
            </div>
            <div className="col">
                <button className="btn btn-light" onClick={this.handleSignOut}>Sign Out</button>
            </div>
        </div>)
    }
}

export default Profile;