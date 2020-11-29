import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { H1, H2, H3 } from '../../style/header'
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
        <br/><br/><br/>
        <H1 style={{fontSize:'300%'}}>BRMKT.</H1>
        <br/><br/>
        <H3 style={{fontSize:'1.5rem'}}> UCLA Buy, Sell, Auction</H3>
        <br/><br/><br/>
      </Hero>

      <div style={{ padding: '20px', fontSize: '30px', border: 'black', borderStyle: 'none', margin: '10px', marginLeft:'85px' }}>
        {/* <Link to={getPath(Route.AUCTIONS)}><H3>&nbsp;&nbsp;Auction&nbsp;&nbsp;&nbsp;&nbsp;</H3></Link> */}

        <Link to={getPath(Route.BEARWEAR)}>
          <H2>&nbsp;&nbsp;Bearwear&nbsp;&nbsp;&nbsp;&nbsp;</H2>
        </Link>
        <Link to={getPath(Route.TEXTBOOK)}>
          <H2>&nbsp;&nbsp;Textbooks&nbsp;&nbsp;&nbsp;&nbsp;</H2>
        </Link>
        <Link to={getPath(Route.DORMSUPPLY)}>
          <H2>&nbsp;&nbsp;Dorm Supply&nbsp;&nbsp;&nbsp;&nbsp;</H2>
        </Link>
        <Link to={getPath(Route.ELECTRONICS)}>
          <H2>&nbsp;&nbsp;Electronics&nbsp;&nbsp;&nbsp;&nbsp;</H2>
        </Link>

      </div>

      <hr style={{width:"800", color:"black", borderTop:"2px solid rgba(0,0,0,.1)"}} />

      <br/><br/><br/>

    </Page>
  )
}

const Hero = style('div', 'tc', {
  backgroundImage: 'url(/app/assets/UCLA.png)',
  backgroundSize: '70px 42px',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
})

