import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { H1, H3 } from '../../style/header'
import { style } from '../../style/styled'
import { Link } from '../nav/Link'
import { AppRouteParams, getPath, Route } from '../nav/route'
import { Page } from './Page'

interface HomePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomePage(props: HomePageProps) {
  return (
    <Page>
      <Hero>
        <H1>BRMKT.</H1>
        <div style={{}}></div>
        <img src={'/app/assets/UCLA.png'} />
        <H3> UCLA Buy, Sell, Auction</H3>
        <br />
      </Hero>
      <br />

      <div style={{ padding: '20px', fontSize: '30px', border: 'black', borderStyle: 'none', margin: '10px' }}>
        {/* <Link to={getPath(Route.AUCTIONS)}><H3>&nbsp;&nbsp;Auction&nbsp;&nbsp;&nbsp;&nbsp;</H3></Link> */}
        <Link to={getPath(Route.BEARWEAR)}>
          <H3>&nbsp;&nbsp;Bearwear&nbsp;&nbsp;&nbsp;&nbsp;</H3>
        </Link>
        <Link to={getPath(Route.TEXTBOOK)}>
          <H3>&nbsp;&nbsp;Textbooks&nbsp;&nbsp;&nbsp;&nbsp;</H3>
        </Link>
        <Link to={getPath(Route.DORMSUPPLY)}>
          <H3>&nbsp;&nbsp;Dorm Supply&nbsp;&nbsp;&nbsp;&nbsp;</H3>
        </Link>
        <Link to={getPath(Route.ELECTRONICS)}>
          <H3>&nbsp;&nbsp;Electronics&nbsp;&nbsp;&nbsp;&nbsp;</H3>
        </Link>
      </div>
    </Page>
  )
}

const Hero = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc')
