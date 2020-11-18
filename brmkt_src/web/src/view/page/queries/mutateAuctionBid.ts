import { gql } from '@apollo/client'
import { getApolloClient } from '../../../graphql/apolloClient'
import { DeleteListing, DeleteListingVariables, PlaceBid, PlaceBidVariables, ProdType } from '../../../graphql/query.gen'

const placeBidMutation = gql`
  mutation PlaceBid($id: Int!, $bidderId: Int!, $bid: Float!) {
    placeBid(id: $id, bidderId: $bidderId, bid: $bid)
  }
`

export function placeBid(id: number, bidderId: number, bid: number) {
  return getApolloClient().mutate<PlaceBid, PlaceBidVariables>({
    mutation: placeBidMutation,
    variables: { id, bidderId, bid },
  })
}

const createNewListingMutation = gql`
  mutation CreateNewListing($title: String!, $price: Float!, $description: String!, $prodType: ProdType!, $sellerId: Int!, $auctionTime: Int!) {
    createNewListing(title: $title, price: $price, description: $description, prodType: $prodType, sellerId: $sellerId, auctionTime: $auctionTime)
  }
`

export function createNewListing(title: string, price: number, description: string, prodType: ProdType, sellerId: number, auctionTime: number) {
  return getApolloClient().mutate<any, any>({
    mutation: createNewListingMutation,
    variables: { title, price, description, prodType, sellerId, auctionTime },
  })
}

const deleteListingMutation = gql`
  mutation DeleteListing($id: Int!) {
    deleteListing(id: $id)
  }
`

export function deleteListing(id: number) {
  return getApolloClient().mutate<DeleteListing, DeleteListingVariables>({
    mutation: deleteListingMutation,
    variables: { id },
  })
}