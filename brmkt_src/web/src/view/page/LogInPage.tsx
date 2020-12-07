import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { check } from '../../../../common/src/util'
import { Button } from '../../style/button'
import { H1, H2, H3 } from '../../style/header'
import { Input } from '../../style/input'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { link } from '../nav/Link'
import { AppRouteParams, getPath, Route } from '../nav/route'
import { handleError } from '../toast/error'
import { toastErr } from '../toast/toast'
import { Page } from './Page'
import { newcardNumber, newEmail, newName, newPassword } from './queries/mutateProfile'

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

const HeaderLink = link(H2)

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
    {/* var aname = {useContext(UserContext).user?.name} */}

    <Page>
      <H1>My Profile</H1>
      <br/>


      <div style={{float:"inline-start"}}>
        {/* <Input type="text" name="number" id = "myText" /> */}

        {/* <H3>Name: { document.getElementById("myText") && useContext(UserContext).user?.name}</H3> */}
        {/* <html>
        <script>
             document.getElementById("demo").innerHTML = document.getElementById("myInput").value;
        </script>
        </html> */}


          {/* <p id="demo"></p> */}
          {/* <button onClick={myFunction}>Click me</button>

        <script>
        function myFunction() {
          document.getElementById("demo").innerHTML = "Hello World";
        }
        </script> */}

        <H3>Name: {useContext(UserContext).user?.name}</H3>
        <Input placeholder="Email" $onSubmit={editName}/>
        <Spacer $h5 />


        <H3>Email: {useContext(UserContext).user?.email}</H3>
        <Input placeholder="Email" $onSubmit={editEmail}/>
        <Spacer $h5 />

        <H3>Password: {useContext(UserContext).user?.password}</H3>
        <Input placeholder="Password" $onSubmit={editPassword}/>
        <Spacer $h5 />

        <H3>Card Number: {useContext(UserContext).user?.cardNumber}</H3>
        <Input placeholder="ID" $onSubmit={editCard}/>
        {/* <h3>ID: {useContext(UserContext).user?.id}</h3>
        <h3>User Type: {useContext(UserContext).user?.userType}</h3> */}

        <Spacer $h5 />
        <Btn style={{backgroundColor:"#FFD100", color:"black"}} onClick={refresh}>Edit profile</Btn>
        <Spacer $h5 />

       </div>
      <span>
      <HeaderLink
          className="link dim pointer"
          $color="sky"
          to={getPath(Route.USER_LISTINGS)}
      >
        <Btn>My Listings</Btn>
      </HeaderLink>
      <br/><br/>
      <HeaderLink
          className="link dim pointer"
          $color="sky"
          to={getPath(Route.USER_PURCHASES)}
      >
        <Btn>My Purchases</Btn>
      </HeaderLink>
      <br/><br/>
      <HeaderLink
          className="link dim pointer"
          $color="sky"
          to={getPath(Route.USER_ACTIVE_BIDS)}
      >
        <Btn>My Bids</Btn>
      </HeaderLink>
      <br/><br/>

      <Btn style={{backgroundColor:"#FFD100", color:"black"}} onClick={logout}>Logout</Btn>

      </span>

    </Page>
    </>

  )


}

const Btn = style('div', 'br2 pa3 tc', {
  borderRadius: '5rem',
  backgroundColor: '#2774AE',
  fontSize: '0.9rem',
  borderWidth: '1px',
  color: 'white',
  padding: '0.5rem',
  width: '200px',
  height: '35px',
})


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

function refresh() {
  window.location.reload()
}


function editName(name: string) {
  const user = useContext(UserContext)
  if (user.user)
  {
    newName(user.user?.id,name)
    window.location.reload()
  }
}

function editEmail(email: string) {
  const user = useContext(UserContext)
  if (user.user)
  {
    newEmail(user.user?.id,email)
    window.location.reload()
  }
}

function editPassword(password: string) {
  const user = useContext(UserContext)
  if (user.user)
  {
    newPassword(user.user?.id,password)
    window.location.reload()
  }
}

function editCard(cardNumber: string) {
  const user = useContext(UserContext)
  if (user.user)
  {
    newcardNumber(user.user?.id,cardNumber)
    window.location.reload()
  }
}


