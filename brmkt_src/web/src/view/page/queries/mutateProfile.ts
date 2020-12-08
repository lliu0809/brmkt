// import { gql } from '@apollo/client'
// import { getApolloClient } from '../../../graphql/apolloClient'
// import {
//   newcardNumber,
//   newcardNumberVariables, newEmail,
//   newEmailVariables,
//   newName,
//   newNameVariables,

//   newPasswordVariables
// } from '../../../graphql/query.gen'

// const newEmailMutation = gql`
//   mutation newEmail($id: Int!, $email: string!) {
//     newEmail(id: $id, email: $email)
//   }
// `
// export function newEmail(id: number, email: string) {
//   return getApolloClient().mutate<newEmail, newEmailVariables>({
//     mutation: newEmailMutation,
//     variables: { id, email},
//   })
// }

// const newNameMutation = gql`
//   mutation newName($id: Int!, $name: string!) {
//     newName(id: $id, name: $name)
//   }
// `
// export function newName(id: number, name: string) {
//   return getApolloClient().mutate<newName, newNameVariables>({
//     mutation: newNameMutation,
//     variables: { id, name},
//   })
// }

// const newPasswordMutation = gql`
//   mutation newPassword($id: Int!, $password: string!) {
//     newPassword(id: $id, password: $password)
//   }
// `
// export function newPassword(id: number, password: string) {
//   return getApolloClient().mutate<newEmail, newPasswordVariables>({
//     mutation: newPasswordMutation,
//     variables: { id, password},
//   })
// }

// const newcardNumberMutation = gql`
//   mutation newcardNumber($id: Int!, $cardNumber: string!) {
//     newcardNumber(id: $id, cardNumber: $cardNumber)
//   }
// `
// export function newcardNumber(id: number, cardNumber: string) {
//   return getApolloClient().mutate<newcardNumber, newcardNumberVariables>({
//     mutation: newcardNumberMutation,
//     variables: { id, cardNumber},
//   })
// }

