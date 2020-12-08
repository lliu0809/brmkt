// import { gql } from '@apollo/client'

// export const fragmentAuction = gql`
//   fragment Auction on Auction {
//     id
//     title
//     price
//     description
//     prodType
//     sellerId
//     currentHighestId
//     auctionTime
//     status
//     auctionStartTime
//   }
// `

// export const fragmentActiveBid = gql`
//   fragment ActiveBid on ActiveBid {
//     bid
//     bidderId
//     auction {
//       ...Auction
//     }
//   }
// `

// export const fetchAuctions = gql`
//   query FetchAuctions {
//     auctions {
//       ...Auction
//     }
//   }
//   ${fragmentAuction}
// `

// export const fetchAuctionListing = gql`
//   query FetchAuctionListing($auctionId: Int!) {
//     auctionListing(auctionId: $auctionId) {
//       ...Auction
//     }
//   }
//   ${fragmentAuction}
// `

// export const fetchMyListings = gql`
//   query FetchMyListings($sellerId: Int!) {
//     myListings(sellerId: $sellerId) {
//       ...Auction
//     }
//   }
//   ${fragmentAuction}
// `

// export const fetchMyActiveBids = gql`
//   query FetchMyActiveBids($bidderId: Int!) {
//     myActiveBids(bidderId: $bidderId) {
//       ...ActiveBid
//     }
//   }
//   ${fragmentAuction}
//   ${fragmentActiveBid}
// `
import { gql } from '@apollo/client'

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

export const fragmentActiveBid = gql`
  fragment ActiveBid on ActiveBid {
    bid
    bidderId
    auction {
      ...Auction
    }
  }
`

export const fragmentPaginatedAuction = gql`
  fragment PaginatedAuction on PaginatedAuction {
    auctions {
      ...Auction
    }
    cursor
    hasMore
  }
`

export const fetchAuctions = gql`
  query FetchAuctions($cursor: Int) {
    auctions(cursor: $cursor) {
      ...PaginatedAuction
    }
  }
  ${fragmentAuction}
  ${fragmentPaginatedAuction}
`

export const fetchAuctionListing = gql`
  query FetchAuctionListing($auctionId: Int!) {
    auctionListing(auctionId: $auctionId) {
      ...Auction
    }
  }
  ${fragmentAuction}
`

export const fetchMyListings = gql`
  query FetchMyListings($sellerId: Int!) {
    myListings(sellerId: $sellerId) {
      ...Auction
    }
  }
  ${fragmentAuction}
`

export const fetchMyActiveBids = gql`
  query FetchMyActiveBids($bidderId: Int!) {
    myActiveBids(bidderId: $bidderId) {
      ...ActiveBid
    }
  }
  ${fragmentAuction}
  ${fragmentActiveBid}
`
