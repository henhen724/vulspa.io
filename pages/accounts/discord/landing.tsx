import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import { getErrorMessage } from '../../../lib/form'

const DiscordResponseQuery = gql`
query DiscordResponseQuery($code: String!, $state: String!) {
    discordOAuthCode(code: $code, state: $state) {
        name
    }
}

`

const DiscordLanding = ({ query }) => {
    const { loading, error, data } = useQuery(DiscordResponseQuery, { variables: { code: query.code, state: query.state } });
    if (loading) return (<div className="container bg-info text-center border mt-4 pb-2">
        Waiting for discord to respond.
    </div>)
    if (error) {
        return (<div className="container text-center">
            <h1>INTERNAL SERVER ERROR.  Please report this bug.</h1>
            {getErrorMessage(error)}
        </div>)
    }
    const router = useRouter()
    router.push("/accounts");
}

DiscordLanding.getInitialProps = async ctx => {
    return { query: ctx.query }
}

export default DiscordLanding;