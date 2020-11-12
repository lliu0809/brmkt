import { gql } from '@apollo/client'

export const fragmentPurchase = gql`
  fragment Purchase on Purchase {
    id
    prodId
  }
`
export const fetchPurchases = gql`
  query FetchPurchases {
    purchases {
      ...Purchase
    }
  }
  ${fragmentPurchase}
`
