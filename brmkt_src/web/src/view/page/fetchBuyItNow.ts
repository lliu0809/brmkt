import { gql } from '@apollo/client'

export const fragmentBuyItNow = gql`
  fragment BuyItNow on BuyItNow {
    id
    title
    price
    description
    prodType
    seller
    buyer
    status
  }
`
export const fetchBuyItNows = gql`
  query FetchBuyItNows {
    buyItNows {
      ...BuyItNow
    }
  }
  ${fragmentBuyItNow}
`

export const fetchBinListing = gql`
  query FetchBinListing($binId: Int!) {
    binListing(binId: $binId) {
      ...BuyItNow
    }
  }
  ${fragmentBuyItNow}
`