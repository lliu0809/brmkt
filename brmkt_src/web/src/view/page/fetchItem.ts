import { gql } from '@apollo/client'

export const fragmentUser = gql`
  fragment User on User {
    id
    name
    email
    userType
  }
`

export const fragmentItem = gql`
  fragment Selling on Item {
    id
    title
    price
    shipping
    description
    category
    seller
    buyer
    timeAdded
    itemType
    auctionTime
  }
`
export const fetchItems = gql`
  query fetchItems {
      items {
        ...Selling
      }
    }
    ${fragmentUser}
    ${fragmentItem}
  `