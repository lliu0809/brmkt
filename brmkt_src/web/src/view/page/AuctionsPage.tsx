
import { useQuery } from '@apollo/client'
import { RouteComponentProps, useLocation } from '@reach/router'
import * as React from 'react'
import { useContext, useState } from 'react'
import { Colors } from '../../../../common/src/colors'
import { FetchAuctionListing, FetchAuctionListingVariables, FetchAuctions, ItemStatus } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { H1, H2, H3, H4 } from '../../style/header'
import { Input } from '../../style/input'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { link } from '../nav/Link'
import { AppRouteParams, getAuctionListingPath } from '../nav/route'
import { handleError } from '../toast/error'
import { HomePage } from './HomePage'
import { Page } from './Page'
import { fetchAuctionListing, fetchAuctions } from './queries/fetchAuctions'
import { placeBid } from './queries/mutateAuctionBid'
import { createNewPurchase } from './queries/mutatePurchase'

interface AuctionsPageProps extends RouteComponentProps, AppRouteParams {}

export function AuctionsPage(props: AuctionsPageProps) {
  return (
    <Page>
      <HomePage />
      <Auctions />
    </Page>
  )
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
  const { user } = useContext(UserContext)

  if (loading) {
    return <div>loading...</div>
  } else if (!data || data.auctions.length === 0) {
    return <div>no auctions</div>
  } else {
    return (
      <div style={{marginLeft:'135px' }} className="mw6">

        <SearchBar>
          <H4>Search for an item: &nbsp;&nbsp; <Input style={{display:"inline", width:"300px"}} $onChange={setAuctionQuery} /> </H4>
        </SearchBar>
        <br/><br/>

        {/* does search filter */}
        {/* does search filter */}
        <Spacer $h4 />
        {data.auctions
          .filter(auction => auction.status === ItemStatus.NOTSOLD)
          .filter(auction => auction.title.toLowerCase().includes(auctionQuery.toLowerCase()))

          .map((auction, i) => (
            <div key={i} className="pa3 br2 mb2 bg-black-10 flex items-center">
              <HeaderLink
                className="link dim pointer"
                $color="sky"
                to={user ? getAuctionListingPath(auction.id) : 'app/login'}
              >
                <Product>
                  <Image>
                    <img src={'/app/assets/auction/' + auction.title + '.png'} />
                  </Image>
                  <Description>
                    <Item>
                      <H3>{auction.title}</H3>
                      <H3>Item ID: {auction.id}</H3>
                      <H3>Current Bid: ${auction.price}</H3>
                    </Item>
                    <Btn>Place a bid !</Btn>
                  </Description>
                </Product>
              </HeaderLink>
              <Spacer $w4 />
            </div>
          ))}
      </div>
    )
  }
}

const HeaderLink = link(H2)

const Hero = style('div', 'mb4 w-100 b--mid-gray br2 pa3 tc')

const Product = style('td', 'w-100  b--mid-gray br2 pa3 tc', {
  textAlign: 'left',
  borderBottomColor: Colors.black + '!important',
  borderLeftColor: Colors.white + '!important',
  borderRightColor: Colors.white + '!important',
  borderTopColor: Colors.black + '!important',
})

const SearchBar = style('td', '  ', {
  marginBottom: '50px',
  display: 'inline',
})


const Image = style('td', '  ', {
  height: '12rem',
  width: '12rem',
  float: 'left',
})

const Item = style('td', '  ', {
  bottom: '2rem',
  padding: '0.5rem',
  fontFamily: 'sans-serif',
  fontSize: '1.5rem',
})

const Description = style('td', '  ', {
  paddingLeft: '50px',
  float: 'left',
})

const Btn = style('div', 'br2 pa3 tc', {
  borderRadius: '5rem',
  backgroundColor: '#2774AE',
  fontSize: '0.9rem',
  borderWidth: '1px',
  color: 'white',
  padding: '0.5rem',
})

/*const Italic = style('div', '  ', {
  fontStyle: 'italic',
})*/

export function AuctionListing({ auctionId }: { auctionId: number }) {
  const user = useContext(UserContext)
  const { loading, data, refetch } = useQuery<FetchAuctionListing, FetchAuctionListingVariables>(fetchAuctionListing, {
    variables: { auctionId },
  })

  function doPlaceBid(val: string) {
    if (user.user && aucState !== 'Ended') {
      placeBid(auctionId, user.user.id, Number(val)).catch(handleError)
      refreshPage()
    } else if (aucState == 'Ended') {
      alert("The auction has ended. You can't place more bids.")
    }
  }

  function doCreateNewPurchase() {
    if (data) {
      if (data.auctionListing) {
        alert('Congratulations! You order has been created.')
        createNewPurchase(data.auctionListing.price, auctionId)
        setPurchased(true)
      }
    }
  }

  const [days, setDays] = useState(0)
  const [hrs, setHrs] = useState(0)
  const [mins, setMins] = useState(0)
  const [secs, setSecs] = useState(0)
  const [aucState, setAucState] = useState('Active')
  const [confirmAuc, setConfirmAuc] = useState(false)
  const [puchased, setPurchased] = useState(false)

  function showConfirmButton(bidder_id: number, cur_user_id: number) {
    if (confirmAuc && bidder_id == cur_user_id) {
      return <Button onClick={doCreateNewPurchase}>Confirm Order</Button>
    } else {
      return confirmAuc
    }
  }

  function fetchUserId() {
    if (user.user) {
      return user.user.id
    } else {
      return -100
    }
  }

  function calculateCountDown(endTime: Date) {
    const curTime = new Date()
    var seconds = (endTime.getTime() - curTime.getTime()) / 1000
    if (seconds <= 0) {
      setAucState('Ended')
      setConfirmAuc(true)
      //check user context, if the highest bid, return confirmation button
      setDays(0)
      setHrs(0)
      setMins(0)
      setSecs(0)
      return
    }
    const day_tmp = Math.floor(seconds / (60 * 60 * 24))
    setDays(day_tmp)
    seconds -= day_tmp * 60 * 60 * 24
    const hours = Math.floor(seconds / (60 * 60))
    setHrs(hours)
    seconds -= hours * 60 * 60
    const minutes = Math.floor(seconds / 60)
    setMins(minutes)
    seconds -= minutes * 60
    const sec = Math.trunc(seconds)
    setSecs(sec)
  }
  function refreshPage() {
    refetch().catch(handleError)
    if (typeof window !== 'undefined') window.location.reload()
  }
  function pad(d: number) {
    return d < 10 ? '0' + d.toString() : d.toString()
  }

  function displayTime() {
    if (aucState == 'Ended') {
      return 'The auction has ended!'
    } else {
      return days + ' days ' + pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + ' left'
    }
  }

  if (loading || data == null) {
    return <div>loading...</div>
  } else if (!data || !data.auctionListing) {
    return <div>no such listing</div>
  } else {
    const end = new Date(data.auctionListing.auctionStartTime)
    //calculateCountDown(end)
    //setAuc()
    setInterval(function () {
      calculateCountDown(end)
    }, 10)

    const bidder_id =
      data.auctionListing.currentHighestId == null ? -1 : data.auctionListing.currentHighestId

    const cur_user_id = fetchUserId()

    if (puchased) {
      return (
        <div className="flex flex-column mw6">
          <H3>This item has been purchased!</H3>
        </div>
      )
    }
    return (
      <div style={{marginLeft:'135px' }} className="flex flex-column mw6">
        <Hero>
          <H1>{data.auctionListing.title}</H1>
          <br />
        </Hero>
        <H3>
          <b>Current Bid:</b> <i> ${data.auctionListing.price}</i>
        </H3>{' '}
        <br />
        <H3>
          <b>Place a bid:</b> <Input placeholder="Enter your bid and hit return!" $onSubmit={doPlaceBid} />{' '}
        </H3>
        <br />
        <H3>
          <b>Count Down:</b> <i>{displayTime()}</i>
        </H3>
        <br />
        <H3 className="center">{showConfirmButton(bidder_id, cur_user_id)}</H3>
        <Spacer $h3 />
        <br/><br/><br/><br/><br/>
      </div>
    )
  }
}

