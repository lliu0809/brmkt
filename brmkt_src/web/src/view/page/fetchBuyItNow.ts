import { gql } from '@apollo/client'

export const fragmentUser = gql`
  fragment User on User {
    id
    name
    email
    userType
  }
`

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