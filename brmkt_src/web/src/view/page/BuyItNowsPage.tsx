import { useQuery } from '@apollo/client'
import { RouteComponentProps, useLocation } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { FetchBinListing, FetchBinListingVariables, FetchBuyItNows, ItemStatus } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { H1, H2 } from '../../style/header'
import { Input } from '../../style/input'
import { Spacer } from '../../style/spacer'
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
      <div className="mw6">
          {/* does search filter */}
        <Input $onChange={setBuyItNowQuery} />
        <Spacer $h4 />
        {data.buyItNows
          .filter(buyItNow => buyItNow.status === ItemStatus.NOTSOLD)
          .filter(buyItNow => buyItNow.title.toLowerCase().includes(buyItNowQuery.toLowerCase()))
          // Use .filter to do filter the list of auctions
          // Use .sort to sort by date?

          .map((buyItNow, i) => (
            <div key={i} className="pa3 br2 mb2 bg-black-10 flex items-center">
              <HeaderLink className="link dim pointer" $color="sky" to={getBinListingPath(buyItNow.id)}>
                {buyItNow.title} · {buyItNow.price}
              </HeaderLink>
            <Spacer $w4 />
            </div>
          ))}
      </div>
    )
  }
}

const HeaderLink = link(H2)

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