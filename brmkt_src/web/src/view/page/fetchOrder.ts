import { gql } from '@apollo/client'

export const fragmentOrder = gql`
  fragment Order on Order {
    id
    prodId
    buyerId
    sellerId
    orderType
  }
`
export const fetchOrders = gql`
  query FetchOrders {
    orders {
      ...Order
    }
  }
  ${fragmentOrder}
`
