import { useQuery } from '@apollo/client'
import { RouteComponentProps, useLocation } from '@reach/router'
import * as React from 'react'
import { useContext, useState } from 'react'
import { Colors } from '../../../../common/src/colors'
import { FetchAuctionListing, FetchAuctionListingVariables, FetchAuctions, ItemStatus } from '../../graphql/query.gen'
import { H1, H2, H3 } from '../../style/header'
import { Input } from '../../style/input'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { link } from '../nav/Link'
import { AppRouteParams, getAuctionListingPath } from '../nav/route'
import { handleError } from '../toast/error'
import { Page } from './Page'
import { fetchAuctionListing, fetchAuctions } from './queries/fetchAuctions'
import { placeBid } from './queries/mutateAuctionBid'

interface AuctionsPageProps extends RouteComponentProps, AppRouteParams {}

export function AuctionsPage(props: AuctionsPageProps) {
  return (
    <Page>
      <Auctions />
    </Page>
  )
}

export function Auctions() {
  const location = useLocation()
  const [, auctionId] = (location.search || '').split('?auctionId=')
  return auctionId ? <AuctionListing auctionId={Number(auctionId)} /> : <AuctionList />
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AuctionList() {
  const [auctionQuery, setAuctionQuery] = useState(' ')
  const { loading, data } = useQuery<FetchAuctions>(fetchAuctions)

  if (loading) {
    return <div>loading...</div>
  } else if (!data || data.auctions.length === 0) {
    return <div>no auctions</div>
  } else {
    return (
      <div className="mw6">
        <Hero>
          <H1>BRMKT.</H1>
          <H3> UCLA Buy, Sell, Auction</H3>
          <br />
        </Hero>
        <H3>
          Search for an item: <Input $onChange={setAuctionQuery} />
        </H3>
        {/* does search filter */}
        {/* does search filter */}
        <Spacer $h4 />
        {data.auctions
          .filter(auction => auction.auction.status === ItemStatus.NOTSOLD)
          .filter(auction => auction.auction.title.toLowerCase().includes(auctionQuery.toLowerCase()))

          .map((auction, i) => (
            <div key={i} className="pa3 br2 mb2 bg-black-10 flex items-center">
              <HeaderLink className="link dim pointer" $color="sky" to={getAuctionListingPath(auction.auction.id)}>
                <Product>
                  <Image>
                    <img src={'/app/assets/auction/NEW TV.png'} />
                  </Image>
                  <Description>
                    <Item>
                      <H3>{auction.auction.title}</H3>
                    </Item>
                    <PriceTag>
                      <H3>Item ID: {auction.auction.id}</H3>
                    </PriceTag>
                    <PriceTag>
                      <H3>Current Bid: {auction.topBid}</H3>
                    </PriceTag>
                    <Btn>Place a bid !</Btn>
                  </Description>
                </Product>
                <img src={'/app/assets/auction/NEW chair.png'} />
              </HeaderLink>
              <Spacer $w4 />
            </div>
          ))}
      </div>
    )
  }
}

const HeaderLink = link(H2)

const Hero = style('div', 'mb4 w-100 b--mid-gray br2 pa3 tc')

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
})

const Image = style('td', '  ', {
  height: '12rem',
  width: '12rem',
  float: 'left',
})

const Item = style('td', '  ', {
  fontSize: '1.3rem',
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
  padding: '0.5rem',
})

export function AuctionListing({ auctionId }: { auctionId: number }) {
  const user = useContext(UserContext)
  const { loading, data } = useQuery<FetchAuctionListing, FetchAuctionListingVariables>(fetchAuctionListing, {
    variables: { auctionId },
  })

  function doPlaceBid(val: string) {
    if(user.user) {
      placeBid(auctionId, user.user.id, Number(val)).catch(handleError)
    }
    // NEED TO REDIRECT TO LOGIN PAGE IF USER IS NULL
  }

  function calculateCountDown(endTime: Date) {
    const curTime = new Date()
    var seconds = (endTime.getTime() - curTime.getTime()) / 1000
    const days = Math.floor(seconds / (60 * 60 * 24))
    seconds -= days * 60 * 60 * 24
    const hours = Math.floor(seconds / (60 * 60))
    seconds -= hours * 60 * 60
    const minutes = Math.floor(seconds / 60)
    seconds -= minutes * 60
    seconds = Math.trunc(seconds)
    return { days, hours, minutes, seconds }
  }

  if (loading || data == null) {
    return <div>loading...</div>
  } else if (!data || !data.auctionListing) {
    return <div>no such listing</div>
  } else {
    return (
      <div className="flex flex-column mw6">
        <div className="flex items-center">
          <H1>{data.auctionListing.auction.title}</H1>
          <Spacer $w4 />
          <H1>{data.auctionListing.topBid}</H1>
          <Spacer $w4 />
          <Input $onSubmit={doPlaceBid} />
        </div>
        <div className="flex items-center">
          <H1>Auction End Time</H1>
          <Spacer $w4 />
          <Spacer $w4 />
          <Spacer $w4 />
          <H1>{data.auctionListing.auctionStartTime}</H1>
        </div>
        <div className="flex items-center">
          <H1>Count Down</H1>
          <Spacer $w4 />
          <Spacer $w4 />
          <Spacer $w4 />
          <H1>
            {calculateCountDown(new Date(data.auctionListing.auctionStartTime)).days} days{' '}
            {calculateCountDown(new Date(data.auctionListing.auctionStartTime)).hours}:
            {calculateCountDown(new Date(data.auctionListing.auctionStartTime)).minutes}:
            {calculateCountDown(new Date(data.auctionListing.auctionStartTime)).seconds} left
          </H1>
        </div>

        <Spacer $h3 />
      </div>
    )
  }
}
