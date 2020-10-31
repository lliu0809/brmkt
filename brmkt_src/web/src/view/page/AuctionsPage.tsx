import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface AuctionsPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AuctionsPage(props: AuctionsPageProps) {
  fetch('/auctions')
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => {
      console.error(err)
    })

  return (
    <Page>
      <div>hello world!</div>
    </Page>
  )
}