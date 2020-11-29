import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { check } from '../../../../common/src/util'
import { Button } from '../../style/button'
import { H1, H3 } from '../../style/header'
import { Input } from '../../style/input'
import { Spacer } from '../../style/spacer'
import { UserContext } from '../auth/user'
import { AppRouteParams } from '../nav/route'
import { handleError } from '../toast/error'
import { toastErr } from '../toast/toast'
import { Page } from './Page'


interface LogInPageProps extends RouteComponentProps, AppRouteParams {}

export function LogInPage(props: LogInPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setError] = useState({ email: false, password: false })
  const { user } = useContext(UserContext)

  // reset error when email/password change
  useEffect(() => setError({ ...err, email: !validateEmail(email) }), [email])
  useEffect(() => setError({ ...err, password: false }), [password])

  function login() {
    if (!validate(email, password, setError)) {
      toastErr('invalid email/password')
      return
    }

    fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(res => {
        check(res.ok, 'response status ' + res.status)
        return res.text()
      })
      .then(() => window.location.reload())
      .catch(err => {
        toastErr(err.toString())
        setError({ email: true, password: true })
      })
  }

  if (user) {
    return  <Logout />
  }

  return (
    <>
      <Page>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="email">
            Email address
          </label>
          <Input $hasError={err.email} $onChange={setEmail} $onSubmit={login} name="email" type="email" />
        </div>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="password">
            Password
          </label>
          <Input $hasError={err.password} $onChange={setPassword} $onSubmit={login} name="password" type="password" />
        </div>
        <div className="mt3">
          <Button onClick={login}>Sign In</Button>
        </div>
      </Page>
    </>
  )
}

function Logout() {
  // const { user } = useContext(UserContext)
  function logout() {
    return fetch('../auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        check(res.ok, 'response status ' + res.status)
        window.location.reload()
      })
      .catch(handleError)
  }




  return (
    <>
    <Page>
      <span>
        <H3>LOGIN</H3>
      </span>
      <span>
        <H1>Your Profile</H1>
        <br/>

        <h3>Name: {useContext(UserContext).user?.name}</h3>
        <h3>Email: {useContext(UserContext).user?.email}</h3>
        <h3>Password: {useContext(UserContext).user?.password}</h3>
        <h3>Card Number: {useContext(UserContext).user?.cardNumber}</h3>
        {/* <h3>ID: {useContext(UserContext).user?.id}</h3>
        <h3>User Type: {useContext(UserContext).user?.userType}</h3> */}

        <Spacer $h5 />
        {/* <Button onClick={goProfile}>Edit profile</Button> */}
        <Spacer $h5 />
        <Button onClick={logout}>Logout</Button>
      </span>

    </Page>
    </>
  )
}

function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

function validate(
  email: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<{ email: boolean; password: boolean }>>
) {
  const validEmail = validateEmail(email)
  const validPassword = Boolean(password)
  console.log('valid', validEmail, validPassword)
  setError({ email: !validEmail, password: !validPassword })
  return validEmail && validPassword
}

