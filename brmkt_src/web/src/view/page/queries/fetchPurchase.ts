import { gql } from '@apollo/client'

export const fragmentPurchase = gql`
  fragment Purchase on Purchase {
    id
    total
    itemSold {
      ...AuctionTopBid
    }
  }
`

export const fragmentTopBid = gql`
  fragment AuctionTopBid on AuctionTopBid {
    topBid
    auctionStartTime
    auction {
      ...Auction
    }
  }
`

export const fragmentAuction = gql`
  fragment Auction on Auction {
    id
    title
    price
    description
    prodType
    sellerId
    currentHighestId
    auctionTime
    status
  }
`

export const fetchMyPurchases = gql`
  query FetchMyPurchases($buyerId: Int!)  {
    myPurchases(buyerId: $buyerId) {
      ...Purchase
    }
  }
  ${fragmentAuction}
  ${fragmentTopBid}
  ${fragmentPurchase}
`