import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Colors } from '../../../../common/src/colors'
import { FetchMyListings, FetchMyListingsVariables } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { H1, H3 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { AppRouteParams } from '../nav/route'
import { handleError } from '../toast/error'
import { LogInPage } from './LogInPage'
import { Page } from './Page'
import { fetchMyListings } from './queries/fetchAuctions'
import { deleteListing } from './queries/mutateAuctionBid'

interface UserListingsPageProps extends RouteComponentProps, AppRouteParams {}

export function UserListingsPage(props: UserListingsPageProps) {
  const user = React.useContext(UserContext)

  if (!user.user) {
    return <LogInPage />
  } else {
    return (
      <Page>
        <MyListings sellerId={user.user.id} />
      </Page>
    )
  }
}

function MyListings({ sellerId }: { sellerId: number }) {
  const { loading, data, refetch } = useQuery<FetchMyListings, FetchMyListingsVariables>(fetchMyListings, {
    variables: { sellerId },
  })

  function refreshPage() {
    if (typeof window !== 'undefined') window.location.reload()
  }

  function doDeleteListing(auctionId: number) {
    deleteListing(auctionId)
    refetch().catch(handleError)

    refreshPage()
  }

  if (loading) {
    return <div>loading...</div>
  } else if (!data || data.myListings.length == 0) {
    return <div>no listings</div>
  } else {
    return (
      <div className="mw6">
        <Hero>
          <H1>BRMKT.</H1>
          <H3> UCLA Buy, Sell, Auction</H3>
          <br />
        </Hero>
        <Spacer $h4 />
        <H3>My Listings</H3>
        {data.myListings.map((myListing, i) => (
          <div key={i} className="pa3 br2 bg-black-10 flex items-center">
            <Product>
              <br />
              <br />
              <Image>
                <img src={'/app/assets/auction/NEW TV.png'} />
              </Image>
              <Description>
                <Item>
                  <H3>{myListing.title}</H3>
                  <H3>Item ID: {myListing.id}</H3>
                  <H3>Current Bid: {myListing.price}</H3>
                </Item>
                <br />
                <Button onClick={() => doDeleteListing(myListing.id)}>Delete Listing</Button>
              </Description>
            </Product>
            <Spacer $w4 />
          </div>
        ))}
      </div>
    )
  }
}

const Hero = style('div', 'mb4 w-100 b--mid-gray br2 pa3 tc')

const Product = style('td', 'w-100  b--mid-gray br2 tc', {
  textAlign: 'left',
  borderBottomColor: Colors.black + '!important',
  borderLeftColor: Colors.white + '!important',
  borderRightColor: Colors.white + '!important',
  borderTopColor: Colors.black + '!important',
  paddingBottom: '5px',
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
