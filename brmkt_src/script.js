import http from 'k6/http'
import { sleep } from 'k6'
import { Counter, Rate } from 'k6/metrics'

export const options = {
   scenarios: {
     example_scenario: {
       // name of the executor to use
       executor: 'ramping-arrival-rate',
       // common scenario configuration
       startRate: '5',
       timeUnit: '1s',
       // executor-specific configuration
       preAllocatedVUs: 5,
       maxVUs: 10,
       stages: [
         { target: 20, duration: '30s' },
         { target: 0, duration: '30s' },
       ],
     },
   },
 }*/
var count = 95
export default function () {
  //load test homepage
  http.get('http://localhost:3000')
  sleep(1)

  //load test createUser
  const resp = http.post(
    'http://localhost:3000/auth/createUser',
    '{"email": "email1@gmail.com","name": "my friend","userType": "USER","address": "address","cardNumber": "1234","password": "password","id": 19,"timeCreated": {},"timeUpdated": {},"userType":"USER"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  sleep(1)

  //load test fetchAuctions
  const resp1 = http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"FetchAuctionListing","variables":{"auctionId":1},"query":"query FetchAuctionListing($auctionId: Int!) {\\n  auctionListing(auctionId: $auctionId) {\n    ...AuctionTopBid\n    __typename\n  }\n}\n\nfragment Auction on Auction {\n  id\n  title\n  price\n  description\n  prodType\n  sellerId\n  currentHighestId\n  auctionTime\n  status\n  __typename\n}\n\nfragment AuctionTopBid on AuctionTopBid {\\n  topBid\\n  auctionStartTime\\n  auction {\\n    ...Auction\\n    __typename\\n  }\\n  __typename\\n}\\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  sleep(1)

  //load test login
  const resp2 = http.post(
    'http://localhost:3000/auth/login',
    '{"email": "email1@gmail.com","password": "password"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  sleep(1)

  //load test logout
  const resp3 = http.post(
    'http://localhost:3000/auth/logout',

  )
  sleep(1)
  //count++
  //load test place bids
  count+=1
  const resp4 = http.post(
    'http://localhost:3000/graphql',
    `{"operationName":"PlaceBid","variables":{"id":2,"bidderId":4,"bid":${count}},"query":"mutation PlaceBid($id: Int!, $bidderId: Int!, $bid: Float!) {\\n  placeBid(id: $id, bidderId: $bidderId, bid: $bid)\\n}\\n"}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  //load test get pages
  http.get('http://localhost:3000/app/buyitnow')

  sleep(1)

  http.get('http://localhost:3000/app/auction')
}

const count200 = new Counter('status_code_2xx')
const count300 = new Counter('status_code_3xx')
const count400 = new Counter('status_code_4xx')
const count500 = new Counter('status_code_5xx')

const rate200 = new Rate('rate_status_code_2xx')
const rate300 = new Rate('rate_status_code_3xx')
const rate400 = new Rate('rate_status_code_4xx')
const rate500 = new Rate('rate_status_code_5xx')

function recordRates(res) {
  if (res.status >= 200 && res.status < 300) {
    count200.add(1)
    rate200.add(1)
  } else if (res.status >= 300 && res.status < 400) {
    console.log(res.body)
    count300.add(1)
    rate300.add(1)
  } else if (res.status >= 400 && res.status < 500) {
    count400.add(1)
    rate400.add(1)
  } else if (res.status >= 500 && res.status < 600) {
    count500.add(1)
    rate500.add(1)
  }
}
