import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { PlaceBid, PlaceBidVariables } from '../../graphql/query.gen'

const placeBidMutation = gql`
  mutation PlaceBid($id: Int!, $bid: Float!) {
    placeBid(id: $id, bid: $bid)
  }
`

export function placeBid(id: number, bid: number) {
  return getApolloClient().mutate<PlaceBid, PlaceBidVariables>({
    mutation: placeBidMutation,
    variables: { id, bid },
  })
}