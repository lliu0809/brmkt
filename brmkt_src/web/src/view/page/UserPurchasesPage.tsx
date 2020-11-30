import { useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { Colors } from '../../../../common/src/colors';
import { FetchMyPurchases, FetchMyPurchasesVariables } from '../../graphql/query.gen';
import { H1, H3, H4 } from '../../style/header';
import { Spacer } from '../../style/spacer';
import { style } from '../../style/styled';
import { UserContext } from '../auth/user';
import { AppRouteParams } from '../nav/route';
import { LogInPage } from './LogInPage';
import { Page } from './Page';
import { fetchMyPurchases } from './queries/fetchPurchase';


interface UserPurchasesPageProps extends RouteComponentProps, AppRouteParams {}

export function UserPurchasesPage(props: UserPurchasesPageProps) {
  const user = React.useContext(UserContext)

  if(!user.user) {
    return <LogInPage/>
  } else {
    return (
      <Page>
        <MyPurchases buyerId={user.user.id}/>
      </Page>
    )
  }
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
            <div key={i} className="pa3 br2 bg-black-10 flex items-center">
              <br/>
              <Product>
                <H4>Order #: {myPurchase.id}</H4>
                <H4>Total: $</H4>
                <Image>
                  <img src={'/app/assets/auction/NEW TV.png'} />
                </Image>
                <Description>
                  <Item>
                    <H3>{myPurchase.itemSold.title}</H3>
                    <H3>Item ID: {myPurchase.itemSold.id}</H3>
                    <H3>Current Bid: {myPurchase.itemSold.price}</H3>
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