import { gql } from '@apollo/client'
import { getApolloClient } from '../../../graphql/apolloClient'

const createNewPurchaseMutation = gql`
  mutation CreateNewPurchase($total: Float!, $auctionTopBidId: Int!) {
    createNewPurchase(total: $total, auctionTopBidId: $auctionTopBidId)
  }
`

export function createNewPurchase(total: number, auctionTopBidId: number) {
  return getApolloClient().mutate<any, any>({
    mutation: createNewPurchaseMutation,
    variables: { total, auctionTopBidId },
  })
}
