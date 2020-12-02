import { useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { Colors } from '../../../../common/src/colors';
import { FetchMyActiveBids, FetchMyActiveBidsVariables } from '../../graphql/query.gen';
import { H1, H3 } from '../../style/header';
import { Spacer } from '../../style/spacer';
import { style } from '../../style/styled';
import { UserContext } from '../auth/user';
import { AppRouteParams } from '../nav/route';
import { LogInPage } from './LogInPage';
import { Page } from './Page';
import { fetchMyActiveBids } from './queries/fetchAuctions';

interface UserActiveBidsPageProps extends RouteComponentProps, AppRouteParams {}

export function UserActiveBidsPage(props: UserActiveBidsPageProps) {
  const user = React.useContext(UserContext)

  if(!user.user) {
    return <LogInPage/>
  } else {
    return (
      <Page>
        <MyActiveBids bidderId={user.user.id}/>
      </Page>
    )
  }
}

function MyActiveBids({ bidderId }: { bidderId: number }) {
  const { loading, data } = useQuery<FetchMyActiveBids, FetchMyActiveBidsVariables>(fetchMyActiveBids, {
    variables: { bidderId },
  })

  if (loading) {
    return <div>loading...</div>
  } else if (!data || data.myActiveBids.length == 0) {
    return <div>no active bids</div>
  } else {
    return (
      <div className="mw6">
        <Hero>
          <H1>BRMKT.</H1>
          <H3> UCLA Buy, Sell, Auction</H3>
          <br />
        </Hero>
        <Spacer $h4 />
        <H3>My Active Bids</H3>
        {data.myActiveBids
          .map((myActiveBid, i) => (
            <div key={i} className="pa3 br2 bg-black-10 flex items-center">
              <Product>
                <Image>
                  <img src={'/app/assets/auction/NEW TV.png'} />
                </Image>
                <Description>
                  <Item>
                    <H3>{myActiveBid.auctionTopBid.auction.title}</H3>
                    <H3>Item ID: {myActiveBid.auctionTopBid.auction.id}</H3>
                    <H3>Current Bid: {myActiveBid.auctionTopBid.topBid}</H3>
                    <H3>Your Bid: {myActiveBid.bid}</H3>
                  </Item>
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

const Product = style('td', 'w-100  b--mid-gray br2 pa3 tc', {
  textAlign: 'left',
  borderBottomColor: Colors.black + '!important',
  borderLeftColor: Colors.white + '!important',
  borderRightColor: Colors.white + '!important',
  borderTopColor: Colors.black + '!important',
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