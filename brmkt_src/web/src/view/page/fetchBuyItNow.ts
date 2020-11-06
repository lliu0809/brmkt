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