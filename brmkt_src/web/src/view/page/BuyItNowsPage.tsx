import { useQuery } from '@apollo/client'
import { RouteComponentProps, useLocation } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { Colors } from '../../../../common/src/colors'
import { FetchBinListing, FetchBinListingVariables, FetchBuyItNows, ItemStatus } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { H1, H2, H3 } from '../../style/header'
import { Input } from '../../style/input'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { link } from '../nav/Link'
import { AppRouteParams, getBinListingPath } from '../nav/route'
import { handleError } from '../toast/error'
import { fetchBinListing, fetchBuyItNows } from './fetchBuyItNow'
import { purchase } from './mutateBuyItNows'
import { Page } from './Page'

interface BuyItNowsPageProps extends RouteComponentProps, AppRouteParams {}

export function BuyItNowsPage(props: BuyItNowsPageProps) {
  return <Page><BuyItNows /></Page>
}

export function BuyItNows() {
  const location = useLocation()
  const [, binId] = (location.search || '').split('?binId=')
  return binId ? <BuyItNowListing binId={Number(binId)} /> : <BuyItNowList />
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function BuyItNowList() {
  const [buyItNowQuery, setBuyItNowQuery] = useState(' ')
  const { loading, data } = useQuery<FetchBuyItNows>(fetchBuyItNows)

  if (loading) {
    return <div>loading...</div>
  }

  else if (!data || data.buyItNows.length === 0) {
    return <div>no buyitnows</div>
  }
  else  {
    return (
      <Page>
      <div className="mw6">
        <H3>Search for an item: <Input $onChange={setBuyItNowQuery} /></H3>

          {/* does search filter */}
        <Spacer $h4 />
        {data.buyItNows
          .filter(buyItNow => buyItNow.status === ItemStatus.NOTSOLD)
          .filter(buyItNow => buyItNow.title.toLowerCase().includes(buyItNowQuery.toLowerCase()))
          // Use .filter to do filter the list of auctions
          // Use .sort to sort by date?

          .map((buyItNow, i) => (
            <div key={i} className="pa3 br2 mb2 flex items-center">
              <HeaderLink className="link dim pointer" $color="black" to={getBinListingPath(buyItNow.id)}>
                <Product>
                  <Image>
                    <img src = {"/app/assets/auction/NEW chair.png"}/>
                  </Image>
                  <Description>
                    <Item>
                      <H3>{buyItNow.title}</H3>
                    </Item>
                    <PriceTag>
                      <H3>Price: {buyItNow.price}</H3>
                    </PriceTag>
                    <Btn>
                      Buy it now !
                    </Btn>
                  </Description>
                </Product>
              </HeaderLink>
            <Spacer $w4 />
            </div>
          ))}
      </div>
      </Page>
    )
  }
}

const HeaderLink = link(H2)

const Product = style('td', 'w-100  b--mid-gray br2 pa3 tc', {
  textAlign: 'left',
  borderBottomColor: Colors.black + '!important',
  borderLeftColor: Colors.white + '!important',
  borderRightColor: Colors.white + '!important',
  borderTopColor: Colors.black + '!important',
})

const PriceTag = style('div', 'pa3 v-mid', {
  bottom: '2rem',
  padding: '0.5rem',
  fontFamily: 'sans-serif',
  fontSize: '1.5rem',
});

const Image = style('td', '  ', {
  height: '7rem',
  width: '7rem',
  float: 'left',
})

const Item = style('td', '  ', {
  fontSize: '1.3rem'
})

const Description = style('td', '  ', {
  paddingLeft: '50px',
  float: 'left',
})

const Btn = style('div', 'br2 pa3 tc', {
  borderRadius: '5rem',
  backgroundColor: '#2774AE',
  fontSize: '0.9rem',
  borderWidth: '1px',
  color: 'white',
  padding: '0.5rem'
})

export function BuyItNowListing({ binId }: { binId: number }) {
  const { loading, data } = useQuery<FetchBinListing, FetchBinListingVariables>(fetchBinListing, {
    variables: { binId },
  })

  function doPurchase(id: number) {
    purchase(id).catch(handleError)
  }

  if (loading || data == null) {
    return <div>loading...</div>
  }

  else if (!data || !data.binListing) {
    return <div>no such listing</div>
  }
  else  {
    return (
      <div className="flex flex-column mw6">
        <div className="flex items-center">
          <H1>{data.binListing.title}</H1>
          <Spacer $w4 />
          <H1>{data.binListing.price}</H1>
          <Spacer $w4 />
          <Button onClick={() => doPurchase(data.binListing.id)}>Buy It Now</Button>
        </div>
        <Spacer $h3 />
      </div>
    )
  }
}