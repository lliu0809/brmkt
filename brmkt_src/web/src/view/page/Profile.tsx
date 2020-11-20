import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useContext, useState } from 'react'
import { Button } from '../../style/button'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'
import { btn, input } from './style'

interface ProfileProps extends RouteComponentProps, AppRouteParams {}

function saveProfile(name: string, username: string, email: string, password: string) {
  return true
}


export function Profile(props: ProfileProps) {

  const [name, setName] = useState<string>('')
  const [userName, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')


  return (
    <Home>
      <Page>
        <h3>Name: {useContext(UserContext).user?.name}</h3>
        <input
          className="input"
          type="text"
          style={input}
          placeholder="Name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value)
          }}
        />
        <Spacer $h4 />
        <h3>Card Number: {useContext(UserContext).user?.cardNumber}</h3>
        <input
          className="input"
          type="text"
          style={input}
          placeholder="Username"
          value={userName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value)
          }}
        />
        <Spacer $h4 />

        <h3>Email: {useContext(UserContext).user?.email}</h3>
        <input
          className="input"
          type="text"
          style={input}
          placeholder="Email"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value)
          }}
        />

        <Spacer $h4 />
        <h3>Password: {useContext(UserContext).user?.password}</h3>
        <input
          className="input"
          type="text"
          style={input}
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value)
          }}
        />
        <Spacer $h4 />

        <>
          <Button
            style={btn}
            onClick={async () => {
              const created = await saveProfile(name, userName, email, password)
              if (created) {
                return
              }
            }}
          >
            Save Profile
          </Button>
          <Spacer $h7 />
        </>

      </Page>
    </Home>
  )
}

const Home = style('div', 'flex', {
  backgroundColor: '#B0C4DE',
  width: '100vw',
  height: '100vh',
  margin: 'none',
  border: 'none',
  display: 'flex',
  justifyContent: 'center',
})

