import { useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { Colors } from '../../../../common/src/colors';
import { FetchMyPurchases, FetchMyPurchasesVariables } from '../../graphql/query.gen';
import { H1, H3, H4 } from '../../style/header';
import { Spacer } from '../../style/spacer';
import { style } from '../../style/styled';
import { AppRouteParams } from '../nav/route';
import { fetchMyPurchases } from './queries/fetchPurchase';

interface UserPurchasesPageProps extends RouteComponentProps, AppRouteParams {}

export function UserPurchasesPage(props: UserPurchasesPageProps) {
  // const user = React.useContext(UserContext)

  return <MyPurchases buyerId={Number(1)}/>

  // if(!user.user) {
  //   // NEED REDIRECT TO LOGIN
  // } else {
  //   return <MyPurchases buyerId={Number(user.user.id)}/>
  // }
}

function MyPurchases({ buyerId }: { buyerId: number }) {
  const { loading, data } = useQuery<FetchMyPurchases, FetchMyPurchasesVariables>(fetchMyPurchases, {
    variables: { buyerId },
  })

  if (loading) {
    return <div>loading...</div>
  } else if (!data || data.myPurchases.length == 0) {
    return <div>no purchases</div>
  } else {
    return (
      <div className="mw6">
        <Hero>
          <H1>BRMKT.</H1>
          <H3> UCLA Buy, Sell, Auction</H3>
          <br />
        </Hero>
        <Spacer $h4 />
        <H3>My Purchases</H3>
        {data.myPurchases
          .map((myPurchase, i) => (
            <div key={i} className="pa3 br2 mb2 bg-black-10 flex items-center">
              <Product>
                <H4>Order #: {myPurchase.id}</H4>
                <H4>Total: $</H4>
                <Image>
                  <img src={'/app/assets/auction/NEW TV.png'} />
                </Image>
                <Description>
                  <Item>
                    <H3>{myPurchase.itemSold.auction.title}</H3>
                  </Item>
                  <PriceTag>
                    <H3>Item ID: {myPurchase.itemSold.auction.id}</H3>
                  </PriceTag>
                  <PriceTag>
                    <H3>Current Bid: {myPurchase.itemSold.topBid}</H3>
                  </PriceTag>
                </Description>
              </Product>
                {myPurchase.itemSold.auction.id} · {myPurchase.itemSold.auction.title} · {myPurchase.itemSold.topBid}{' '}
                <img src={'/app/assets/auction/NEW chair.png'} />
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