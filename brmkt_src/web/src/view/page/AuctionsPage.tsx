import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { FetchAuctions } from '../../graphql/query.gen'
import { Spacer } from '../../style/spacer'
import { AppRouteParams } from '../nav/route'
import { fetchAuctions } from '../page/fetchAuctions'
import { Page } from './Page'

interface AuctionsPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AuctionsPage(props: AuctionsPageProps) {
  const { loading, data } = useQuery<FetchAuctions>(fetchAuctions)

  if (loading || data == null) {
    return <div>loading...</div>
  }

  else if (!data || data.auctions.length === 0) {
    return <div>no auctions</div>
  }
  else  {
    return (
      <Page>
        <div className="mw6">
          <Spacer $h4 />
          {data.auctions

            .map((auction, i) => (
              <div key={i} className="pa3 br2 mb2 bg-black-10 flex items-center">
                <Spacer $w4 />
                {auction.title} · {auction.price}
              </div>
            ))}
        </div>
      </Page>
    )
  }
}