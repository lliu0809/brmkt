import { gql } from '@apollo/client'

export const fragmentPurchase = gql`
  fragment Purchase on Purchase {
    id
    total
    itemSold {
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
    auctionStartTime
  }
`

export const fetchMyPurchases = gql`
  query FetchMyPurchases($buyerId: Int!)  {
    myPurchases(buyerId: $buyerId) {
      ...Purchase
    }
  }
  ${fragmentAuction}
  ${fragmentPurchase}
`