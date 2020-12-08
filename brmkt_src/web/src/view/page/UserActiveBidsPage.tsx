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
    fetchPolicy: "cache-and-network"
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
            <div key={i} className="pa3 br2   flex items-center">
              <Product>
                <Image>
                  <img src={'/app/assets/auction/' + myActiveBid.auction.prodType + '.png'} />
                </Image>
                <Description>
                  <Item>
                    <H3>{myActiveBid.auction.title}</H3>
                    <H3>Item ID: {myActiveBid.auction.id}</H3>
                    <H3>Current Highest Bid: {myActiveBid.auction.price}</H3>
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