import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { check } from '../../../../common/src/util'
import { Button } from '../../style/button'
import { Input } from '../../style/input'
import { AppRouteParams } from '../nav/route'
import { toastErr } from '../toast/toast'
import { Page } from './Page'

interface SignUpPageProps extends RouteComponentProps, AppRouteParams {}

export function SignUpPage(props: SignUpPageProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [err, setError] = useState({ email: false, name: false, password: false, address: false, cardNumber: false })

  // reset error when email/name change
  useEffect(() => setError({ ...err, email: !validateEmail(email) }), [email])
  useEffect(() => setError({ ...err, name: false }), [name])

  function login() {
    if (!validate(email, name, password, address, cardNumber, setError)) {
      toastErr('invalid field')
      return
    }

    fetch('/auth/createUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password, address, cardNumber }),
    })
      .then(res => {
        check(res.ok, 'response status ' + res.status)
        return res.text()
      })
      .then(() => window.location.replace('/'))
      .catch(err => {
        toastErr(err.toString())
        setError({ email: true, name: true, password: true, address: true, cardNumber: true })
      })
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
          <label className="db fw4 lh-copy f6" htmlFor="name">
            Name
          </label>
          <Input $hasError={err.name} $onChange={setName} $onSubmit={login} name="name" />
        </div>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="address">
            Home address
          </label>
          <Input $hasError={err.address} $onChange={setAddress} $onSubmit={login} name="address" type="address" />
        </div>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="password">
            Password
          </label>
          <Input $hasError={err.password} $onChange={setPassword} $onSubmit={login} name="password" type="password" />
        </div>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="cardNumber">
            Card number
          </label>
          <Input
            $hasError={err.cardNumber}
            $onChange={setCardNumber}
            $onSubmit={login}
            name="cardNumber"
            type="cardNumber"
          />
        </div>
        <div className="mt3">
          <Button onClick={login}>Sign Up</Button>
        </div>
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
  name: string,
  password: string,
  address: string,
  cardNumber: string,
  setError: React.Dispatch<
    React.SetStateAction<{ email: boolean; name: boolean; password: boolean; address: boolean; cardNumber: boolean }>
  >
) {
  const validEmail = validateEmail(email)
  const validName = Boolean(name)
  const validCardNumber = Number(cardNumber)
  const validPassword = Boolean(password)
  const validAddress = Boolean(address)
  console.log('valid', validEmail, validName, validCardNumber)
  setError({
    email: !validEmail,
    name: !validName,
    password: !validPassword,
    address: !validAddress,
    cardNumber: !validCardNumber,
  })
  return validEmail && validName && validCardNumber && validPassword && validAddress
}
