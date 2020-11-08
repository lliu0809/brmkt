import { useQuery } from '@apollo/client'
import { RouteComponentProps, useLocation } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { FetchAuctionListing, FetchAuctionListingVariables, FetchAuctions, ItemStatus } from '../../graphql/query.gen'
import { H1, H2 } from '../../style/header'
import { Input } from '../../style/input'
import { Spacer } from '../../style/spacer'
import { link } from '../nav/Link'
import { AppRouteParams, getAuctionListingPath } from '../nav/route'
import { fetchAuctionListing, fetchAuctions } from '../page/fetchAuctions'
import { handleError } from '../toast/error'
import { placeBid } from './mutateAuctionBid'
import { Page } from './Page'

interface AuctionsPageProps extends RouteComponentProps, AppRouteParams {}

export function AuctionsPage(props: AuctionsPageProps) {
  return <Page><Auctions /></Page>
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
  }

  else if (!data || data.auctions.length === 0) {
    return <div>no auctions</div>
  }
  else  {
    return (
      <div className="mw6">
          {/* does search filter */}
        <Input $onChange={setAuctionQuery} />
        <Spacer $h4 />
        {data.auctions
          .filter(auction => auction.auction.status === ItemStatus.NOTSOLD)
          .filter(auction => auction.auction.title.toLowerCase().includes(auctionQuery.toLowerCase()))
          // Use .filter to do filter the list of auctions
          // Use .sort to sort by date?

          .map((auction, i) => (
            <div key={i} className="pa3 br2 mb2 bg-black-10 flex items-center">
              <HeaderLink className="link dim pointer" $color="sky" to={getAuctionListingPath(auction.auction.id)}>
                {auction.auction.title} · {auction.topBid}
              </HeaderLink>
            <Spacer $w4 />
            </div>
          ))}
      </div>
    )
  }
}

const HeaderLink = link(H2)

export function AuctionListing({ auctionId }: { auctionId: number }) {
  const { loading, data } = useQuery<FetchAuctionListing, FetchAuctionListingVariables>(fetchAuctionListing, {
    variables: { auctionId },
  })

  function doPlaceBid(val: string) {
    placeBid(auctionId, Number(val)).catch(handleError)
  }

  if (loading || data == null) {
    return <div>loading...</div>
  }

  else if (!data || !data.auctionListing) {
    return <div>no such listing</div>
  }
  else  {
    return (
      <div className="flex flex-column mw6">
        <div className="flex items-center">
          <H1>{data.auctionListing.auction.title}</H1>
          <Spacer $w4 />
          <H1>{data.auctionListing.topBid}</H1>
          <Spacer $w4 />
          <Input $onSubmit={doPlaceBid} />
        </div>
        <Spacer $h3 />
      </div>
    )
  }
}