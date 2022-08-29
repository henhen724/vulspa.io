import gql from 'graphql-tag'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import { getErrorMessage } from '../../../lib/form'
import { getTokenCookie } from '../../../lib/auth-cookies';

const BungieResponseQuery = gql`
query BungieResponseQuery($code: String!, $state: String!) {
    bungieOAuthCode(code: $code, state: $state) {
        name
    }
}

`

const BungieLanding = ({ query, token }) => {
    if (process.env.NODE_ENV === 'development') {
        const router = useRouter()
        const [sendCode, { called, loading, data, error }] = useLazyQuery(BungieResponseQuery)
        const codeInputRef = useRef(null);

        const _onClick = () => {
            sendCode({ variables: { code: codeInputRef.current.value, state: token } })
        }

        if (!called) {
            return (<div className="container text-center">
                <h1>Please enter the code string below:</h1>
                <input ref={codeInputRef} type="text" id="code" name="code" />
                <button onClick={_onClick}>Submit</button>
            </div>)
        } else if (called && loading) {
            return (<div className="container bg-info text-center border mt-4 pb-2">
                Waiting for bungie to respond.
            </div>)
        } else if (error) {
            return (<div className="container text-center">
                <h1>INTERNAL SERVER ERROR.  Please report this bug.</h1>
                {getErrorMessage(error)}
            </div>)
        }
        router.push("/accounts");
        return (<></>)
    }

    const { loading, error, data } = useQuery(BungieResponseQuery, { variables: { code: query.code } });
    if (loading) return (<div className="container bg-info text-center border mt-4 pb-2">
        Waiting for bungie to respond.
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

BungieLanding.getInitialProps = async ctx => {
    return { query: ctx.query, token: getTokenCookie(ctx.req) }
}

export default BungieLanding;