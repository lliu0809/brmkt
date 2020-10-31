import { gql } from '@apollo/client'

export const fragmentAuction = gql`
  fragment Auction on Auction {
    id
    title
    price
    description
    prodType
    seller
    currentHighest
    bids
    auctionTime
  }
`
export const fetchAuctions = gql`
  query FetchAuctions {
    auctions {
      ...Auction
    }
  }
  ${fragmentAuction}
`