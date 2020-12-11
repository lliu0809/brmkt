import { gql } from '@apollo/client'
import { getApolloClient } from '../../../graphql/apolloClient'

const createNewPurchaseMutation = gql`
  mutation CreateNewPurchase($total: Float!, $auctionId: Int!) {
    createNewPurchase(total: $total, auctionId: $auctionId)
  }
`

export function createNewPurchase(total: number, auctionId: number) {
  return getApolloClient().mutate<any, any>({
    mutation: createNewPurchaseMutation,
    variables: { total, auctionId },
  })
}
