import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { getErrorMessage } from '../../lib/form'
import Field from '../../components/field';
import Header from '../../components/header';

const SignUpMutation = gql`
  mutation SignUpMutation($name: String!, $password: String!) {
  signUp(input:{name: $name, password: $password}) {
    user {
      name
      id
      discord {
        id
      }
    }
  }
}
`

const SignUp = () => {
    const [signUp] = useMutation(SignUpMutation)
    const [errorMsg, setErrorMsg] = useState()
    const router = useRouter()

    async function handleSubmit(event) {
        event.preventDefault()
        const nameElement = event.currentTarget.elements.NAME
        const passwordElement = event.currentTarget.elements.PASSWORD

        try {
            await signUp({
                variables: {
                    name: nameElement.value,
                    password: passwordElement.value,
                },
            })

            router.push('/accounts/signin')
        } catch (error) {
            setErrorMsg(getErrorMessage(error))
        }
    }

    return (
        <div className="container bg-info text-center border mt-4">
            <Header title="Vulspa Sign Up" />
            <h1>VULSPA REGISTRY</h1>
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
                <button className="btn" type="submit">REGISTER</button> or{' '}
                <Link href="signin">
                    <a className="btn text-light">ACCESS</a>
                </Link>
            </form>
        </div>
    )
}

export default SignUp