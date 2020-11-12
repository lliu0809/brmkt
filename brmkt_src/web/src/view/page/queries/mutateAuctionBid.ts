import { gql } from '@apollo/client'
import { getApolloClient } from '../../../graphql/apolloClient'
import { PlaceBid, PlaceBidVariables } from '../../../graphql/query.gen'

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