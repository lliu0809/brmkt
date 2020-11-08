import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { Purchase, PurchaseVariables } from '../../graphql/query.gen'

const purchaseMutation = gql`
  mutation Purchase($id: Int!) {
    purchase(id: $id)
  }
`

export function purchase(id: number) {
  return getApolloClient().mutate<Purchase, PurchaseVariables>({
    mutation: purchaseMutation,
    variables: { id },
  })
}