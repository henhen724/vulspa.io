import { Component, PropTypes } from 'react';
import { Container } from 'reactstrap';
import { withRouter } from 'next/router';

class ErrorPage extends Component {
    static propTypes() {
        return {
            errorCode: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired
        }
    }

    static getInitialProps({ res, xhr }) {
        const errorCode = res ? res.statusCode : (xhr ? xhr.status : null)
        return { errorCode };
    }

    render() {
        var response;
        switch (this.props.errorCode) {
            case 200:
            case 500:
            //These should really have their own page TODO: Add error code 200 and 500 pages.
            case 404:
                response = (
                    <Container className="pt-5 text-center">
                        <h1>Looks like I couldn't find what you are looking for.</h1>
                        <p>The page <strong>{this.props.router.pathname}</strong> does not exist.</p>
                    </Container>);
                break;
            default:
                response = (<Container className="pt-5 text-center">
                    <h1 className="display-4">HTTP {this.props.errorCode} Error</h1>
                    <p>
                        An <strong>HTTP {this.props.errorCode}</strong> error occurred while
                          trying to access <strong>{this.props.router.pathname}</strong>
                    </p>
                </Container>);
        }
        return response;
    }
}

export default withRouter(ErrorPage)