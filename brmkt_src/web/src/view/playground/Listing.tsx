import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Colors } from '../../../../common/src/colors'
import { H1, H3, H4, H5 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { BodyText } from '../../style/text'
import { AppRouteParams } from '../nav/route'
import { Page } from '../page/Page'

interface ListingPageProps extends RouteComponentProps, AppRouteParams{}


export function Listing(props: ListingPageProps) {
 return(
    <Page>
      <Hero>
        <H1>Bruin Maket</H1>
        <H3>UCLA Buy, Sell, Auction</H3>
      </Hero>
      <H5>
        Latest  Bearwear    Textbook    Dorm Supply   Electronices
      </H5>

      <Spacer $h4 />
      <BodyText>
        Most Watched
        <H4>Load Picture From Database</H4>
      </BodyText>
      <Spacer $h4 />

      <BodyText>
        Just Added
        <H4>Load Picture From Database</H4>
      </BodyText>

    </Page>
  )
}

const Hero = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  borderLeftColor: Colors.lemon + '!important',
  borderRightColor: Colors.lemon + '!important',
  borderLeftWidth: '4px',
  borderRightWidth: '4px',
})

// const Content = style('div', 'flex-l')

// const LContent = style('div', 'flex-grow-0 w-70-l mr4-l')

// const RContent = style('div', 'flex-grow-0  w-30-l')


// const TD = style('td', 'pa1', p => ({
//   color: p.$theme.textColor(),
// }))
