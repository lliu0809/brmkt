import { useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { Colors } from '../../../../common/src/colors';
import { FetchMyListings, FetchMyListingsVariables } from '../../graphql/query.gen';
import { Button } from '../../style/button';
import { H1, H3 } from '../../style/header';
import { Spacer } from '../../style/spacer';
import { style } from '../../style/styled';
import { AppRouteParams } from '../nav/route';
import { Page } from './Page';
import { fetchMyListings } from './queries/fetchAuctions';
import { deleteListing } from './queries/mutateAuctionBid';

interface UserListingsPageProps extends RouteComponentProps, AppRouteParams {}

export function UserListingsPage(props: UserListingsPageProps) {
  // const user = React.useContext(UserContext)

  return (
    <Page>
      <MyListings sellerId={Number(1)}/>
    </Page>
  )


  // if(!user.user) {
  //   // NEED REDIRECT TO LOGIN
  // } else {
  //   return <MyListings sellerId={Number(user.user.id)}/>
  // }
}

function MyListings({ sellerId }: { sellerId: number }) {
  const { loading, data } = useQuery<FetchMyListings, FetchMyListingsVariables>(fetchMyListings, {
    variables: { sellerId },
  })

  function doDeleteListing(auctionId: number) {
    deleteListing(auctionId)
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
        {data.myListings
          .map((myListing, i) => (
            <div key={i} className="pa3 br2 mb2 bg-black-10 flex items-center">
              <Product>
                <Image>
                  <img src={'/app/assets/auction/NEW TV.png'} />
                </Image>
                <Description>
                  <Item>
                    <H3>{myListing.auction.title}</H3>
                  </Item>
                  <PriceTag>
                    <H3>Item ID: {myListing.auction.id}</H3>
                  </PriceTag>
                  <PriceTag>
                    <H3>Current Bid: {myListing.topBid}</H3>
                  </PriceTag>
                  <Button onClick={() => doDeleteListing(myListing.auction.id)}>Delete Listing</Button>
                </Description>
              </Product>
                {myListing.auction.id} · {myListing.auction.title} · {myListing.topBid}{' '}
              <Spacer $w4 />
            </div>
          ))}
      </div>
    )
  }
}

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