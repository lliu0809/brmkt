import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { FetchUserContext } from '../../graphql/query.gen'
import { H2 } from '../../style/header'
import { fetchUser } from '../auth/fetchUser'
import { AppRouteParams } from '../nav/route'
//const [listings, setListings] = React.useState([])

interface ProfilePageProps extends RouteComponentProps, AppRouteParams {}

/*function list() {
  toastErr('invalid email/password')
  return
}*/
export function Profile(props: ProfilePageProps){

  const { loading, data, } = useQuery<FetchUserContext>(fetchUser, {
    variables: {name: 'name'},
  })
  if (loading || data == null) {
    return null
  }
  if(data.self == null) { return <H2>I'm Profile</H2>}
  return (
    <><H2>User Profile</H2>
      <H2>{data.self.name}</H2></>
  )
  /*fetch('/listing')
    .then(response =>
      response.json())
    .then(json => console.log(json))
    .catch(err => {
      console.error(err)
    })


  return
  (
    <>
  <Page>
      <Section>
        <H2>User Profile</H2>
        <Spacer $h4 />
        <IntroText>Welcome to Bruin Market.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</IntroText>
        <Spacer $h4 />
        <div>
          <br></br>
          <Button onClick={list}>Edit Profile</Button>
        </div>
        <Spacer $h4 />
        <Spacer $h4 />
        <Table>
          <tbody>
            <Field
              item="Username"
              value="get from database"
            />
          </tbody>
          <tbody>
            <Field
              item="Email"
              value="get from database"
            />
          </tbody>
          <tbody>
            <Field
              item="Phone"
              value="get from database"
            />
          </tbody>
          <tbody>
            <Field
              item="Address"
              value="get from database"
            />
          </tbody>
          <tbody>
            <Field
              item="Bids/Offers"
              listTitle="Bids"
              list={[
                {
                  title: 'Bid1',
                  href: 'https://hpbn.co/primer-on-latency-and-bandwidth/',
                },
                {
                  title: 'Bid2',
                  href: 'https://hpbn.co/building-blocks-of-tcp/',
                },
              ]}
            />
          </tbody>
          <tbody>
            <Field
              item="Past Orders"
              listTitle="Purchases"
              list={[
                {
                  title: 'Order1',
                  href: 'https://hpbn.co/primer-on-latency-and-bandwidth/',
                },
                {
                  title: 'Order2',
                  href: 'https://hpbn.co/building-blocks-of-tcp/',
                },
              ]}
            />
          </tbody>
          <tbody>
            <Field
              item="Selling"
              listTitle="Listings"
              list={[
                {
                  title: 'Listing1',
                  href: 'https://hpbn.co/primer-on-latency-and-bandwidth/',
                },
                {
                  title: 'Listing2',
                  href: 'https://hpbn.co/building-blocks-of-tcp/',
                },
              ]}
            />
          </tbody>
        </Table>
      </Section>
  </Page>
  </>
  )*/
}

/*interface Lists {
  title: string
  href: string
}

function Field(props: {
  item: string
  //title: string
  value?: string
  //href?: string
  list?: Lists[]
  listTitle?: string
}) {
  return (
    <TR>
      <BodyText>
        <TD>{props.item}</TD>
        <TD>
          {props.value}

          {props.list && (
            <>



              <ul className="ml4">
                {props.list.map((rr, i) => (
                  <li key={i}>
                    <Link href={rr.href}>{rr.title}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </TD>
      </BodyText>
    </TR>
  )
}

const Table = style('table', 'w-100 ba b--black')

const Section = style('div', 'mb4 mid-gray ba b--mid-gray br2 pa3 w-100', (p: { $color?: ColorName }) => ({
  borderLeftColor: Colors[p.$color || 'lemon'] + '!important',
  borderLeftWidth: '3px',
}))

const TR = style('tr', 'ba b--black')

const TD = style('td', 'mid-gray pa3 v-mid', { minWidth: '7em' })*/