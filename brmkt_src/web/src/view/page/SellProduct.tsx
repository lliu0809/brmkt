import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { Button } from '../../style/button'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'
import { btn, input } from './style'

interface SellProductProps extends RouteComponentProps, AppRouteParams {}

function saveItem(title: string, bid: string, description: string, photo: string) {
  return true
}


export function SellProduct(props: SellProductProps) {

  const [title, setTitle] = useState<string>('')
  const [bid, setBid] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [photo, setPhoto] = useState<string>('')


  return (
    <Home>
      <Page>
        <input
          className="input"
          type="text"
          style={input}
          placeholder="Title"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }}
        />
        <Spacer $h4 />

        <input
          className="input"
          type="text"
          style={input}
          placeholder="Starting Bid"
          value={userName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBid(e.target.value)
          }}
        />
        <Spacer $h4 />

        <input
          className="input"
          type="text"
          style={input}
          placeholder="Description"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(e.target.value)
          }}
        />

        <Spacer $h4 />
        <input
          className="input"
          type="text"
          style={input}
          placeholder="Photo"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPhoto(e.target.value)
          }}
        />
        <Spacer $h4 />

        <>
          <Button
            style={btn}
            onClick={async () => {
              const created = await saveItem(title, bid, description, photo)
              if (created) {
                return
              }
            }}
          >
            Sell Item
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

