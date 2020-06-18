
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { getErrorMessage } from '../../lib/form';
import Field from '../../components/feild';
import Header from '../../components/header';

const SignInMutation = gql`
  mutation SignInMutation($name: String!, $password: String!) {
    signIn(input: { name: $name, password: $password }) {
      user {
        id
        name
      }
    }
  }
`

function SignIn() {
    const client = useApolloClient()
    const [signIn] = useMutation(SignInMutation, { errorPolicy: 'all' })
    const [errorMsg, setErrorMsg] = useState()
    const router = useRouter()

    async function handleSubmit(event) {
        event.preventDefault()

        const nameElement = event.currentTarget.elements.NAME
        const passwordElement = event.currentTarget.elements.PASSWORD

        await client.resetStore()
        try {
            const { data } = await signIn({
                variables: {
                    name: nameElement.value,
                    password: passwordElement.value,
                }
            })
            if (data.signIn.user) {
                await router.push('/accounts')
            }
        } catch (error) {
            setErrorMsg(getErrorMessage(error));
        }
    }

    return (
        <div className="container bg-info text-center border mt-4">
            <Header title="Vulspa Sign In" />
            <h1>VULSPA ACCESS</h1>
            <form onSubmit={handleSubmit} className="form-group">
                {errorMsg && <p>{errorMsg}</p>}
                <Field
                    name="NAME"
                    type="text"
                    autoComplete="text"
                    required
                    label="Name"
                />
                <Field
                    name="PASSWORD"
                    type="password"
                    autoComplete="password"
                    required
                    label="Password"
                />
                <button className="btn" type="submit">ACCESS</button> or{' '}
                <Link href="signup">
                    <a className="btn text-light">REGISTER</a>
                </Link>
            </form>
        </div>
    )
}

export default SignIn