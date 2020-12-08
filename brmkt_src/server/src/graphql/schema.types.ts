import { GraphQLResolveInfo } from 'graphql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export interface Query {
  __typename?: 'Query'
  self?: Maybe<User>
  surveys: Array<Survey>
  survey?: Maybe<Survey>
  user: User
  auctions: PaginatedAuction
  myListings: Array<Auction>
  myPurchases: Array<Purchase>
  myActiveBids: Array<ActiveBid>
  justPurchased: Purchase
  auctionListing: Auction
}

export interface QuerySurveyArgs {
  surveyId: Scalars['Int']
}

export interface QueryAuctionsArgs {
  cursor?: Maybe<Scalars['Int']>
}

export interface QueryMyListingsArgs {
  sellerId: Scalars['Int']
}

export interface QueryMyPurchasesArgs {
  buyerId: Scalars['Int']
}

export interface QueryMyActiveBidsArgs {
  bidderId: Scalars['Int']
}

export interface QueryAuctionListingArgs {
  auctionId: Scalars['Int']
}

export interface Mutation {
  __typename?: 'Mutation'
  placeBid: Scalars['Boolean']
  purchase: Scalars['Boolean']
  createNewListing: Scalars['Boolean']
  deleteListing: Scalars['Boolean']
  createNewPurchase: Scalars['Boolean']
  answerSurvey: Scalars['Boolean']
  nextSurveyQuestion?: Maybe<Survey>
}

export interface MutationPlaceBidArgs {
  id: Scalars['Int']
  bidderId: Scalars['Int']
  bid: Scalars['Float']
}

export interface MutationPurchaseArgs {
  id: Scalars['Int']
}

export interface MutationCreateNewListingArgs {
  title: Scalars['String']
  price: Scalars['Float']
  description: Scalars['String']
  prodType: ProdType
  sellerId: Scalars['Int']
  auctionTime: Scalars['Int']
}

export interface MutationDeleteListingArgs {
  id: Scalars['Int']
}

export interface MutationCreateNewPurchaseArgs {
  total: Scalars['Float']
  auctionId: Scalars['Int']
}

export interface MutationAnswerSurveyArgs {
  input: SurveyInput
}

export interface MutationNextSurveyQuestionArgs {
  surveyId: Scalars['Int']
}

export interface Subscription {
  __typename?: 'Subscription'
  surveyUpdates?: Maybe<Survey>
}

export interface SubscriptionSurveyUpdatesArgs {
  surveyId: Scalars['Int']
}

export enum UserType {
  Admin = 'ADMIN',
  User = 'USER',
}

export interface Survey {
  __typename?: 'Survey'
  id: Scalars['Int']
  name: Scalars['String']
  isStarted: Scalars['Boolean']
  isCompleted: Scalars['Boolean']
  currentQuestion?: Maybe<SurveyQuestion>
  questions: Array<Maybe<SurveyQuestion>>
}

export interface SurveyQuestion {
  __typename?: 'SurveyQuestion'
  id: Scalars['Int']
  prompt: Scalars['String']
  choices?: Maybe<Array<Scalars['String']>>
  answers: Array<SurveyAnswer>
  survey: Survey
}

export interface SurveyAnswer {
  __typename?: 'SurveyAnswer'
  id: Scalars['Int']
  answer: Scalars['String']
  question: SurveyQuestion
}

export interface SurveyInput {
  questionId: Scalars['Int']
  answer: Scalars['String']
}

export interface User {
  __typename?: 'User'
  id: Scalars['Int']
  userType: UserType
  name: Scalars['String']
  address: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
  cardNumber: Scalars['String']
}

export enum ProdType {
  Bearwear = 'BEARWEAR',
  Textbooks = 'TEXTBOOKS',
  Dormsupply = 'DORMSUPPLY',
  Electronics = 'ELECTRONICS',
  Other = 'OTHER',
}

export enum ItemStatus {
  Notsold = 'NOTSOLD',
  Sold = 'SOLD',
}

export interface PaginatedAuction {
  __typename?: 'PaginatedAuction'
  auctions: Array<Auction>
  cursor: Scalars['Int']
  hasMore: Scalars['Boolean']
}

export interface Auction {
  __typename?: 'Auction'
  id: Scalars['Int']
  title: Scalars['String']
  price: Scalars['Float']
  description: Scalars['String']
  prodType: ProdType
  sellerId: Scalars['Int']
  currentHighestId?: Maybe<Scalars['Int']>
  auctionTime: Scalars['Int']
  status: ItemStatus
  auctionStartTime: Scalars['String']
}

export interface ActiveBid {
  __typename?: 'ActiveBid'
  bid: Scalars['Float']
  bidderId: Scalars['Int']
  auction: Auction
}

export interface Purchase {
  __typename?: 'Purchase'
  id: Scalars['Int']
  total: Scalars['Float']
  itemSold: Auction
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Mutation: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Float: ResolverTypeWrapper<Scalars['Float']>
  String: ResolverTypeWrapper<Scalars['String']>
  Subscription: ResolverTypeWrapper<{}>
  UserType: UserType
  Survey: ResolverTypeWrapper<Survey>
  SurveyQuestion: ResolverTypeWrapper<SurveyQuestion>
  SurveyAnswer: ResolverTypeWrapper<SurveyAnswer>
  SurveyInput: SurveyInput
  User: ResolverTypeWrapper<User>
  ProdType: ProdType
  ItemStatus: ItemStatus
  PaginatedAuction: ResolverTypeWrapper<PaginatedAuction>
  Auction: ResolverTypeWrapper<Auction>
  ActiveBid: ResolverTypeWrapper<ActiveBid>
  Purchase: ResolverTypeWrapper<Purchase>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  Int: Scalars['Int']
  Mutation: {}
  Boolean: Scalars['Boolean']
  Float: Scalars['Float']
  String: Scalars['String']
  Subscription: {}
  Survey: Survey
  SurveyQuestion: SurveyQuestion
  SurveyAnswer: SurveyAnswer
  SurveyInput: SurveyInput
  User: User
  PaginatedAuction: PaginatedAuction
  Auction: Auction
  ActiveBid: ActiveBid
  Purchase: Purchase
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  self?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  surveys?: Resolver<Array<ResolversTypes['Survey']>, ParentType, ContextType>
  survey?: Resolver<
    Maybe<ResolversTypes['Survey']>,
    ParentType,
    ContextType,
    RequireFields<QuerySurveyArgs, 'surveyId'>
  >
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  auctions?: Resolver<
    ResolversTypes['PaginatedAuction'],
    ParentType,
    ContextType,
    RequireFields<QueryAuctionsArgs, never>
  >
  myListings?: Resolver<
    Array<ResolversTypes['Auction']>,
    ParentType,
    ContextType,
    RequireFields<QueryMyListingsArgs, 'sellerId'>
  >
  myPurchases?: Resolver<
    Array<ResolversTypes['Purchase']>,
    ParentType,
    ContextType,
    RequireFields<QueryMyPurchasesArgs, 'buyerId'>
  >
  myActiveBids?: Resolver<
    Array<ResolversTypes['ActiveBid']>,
    ParentType,
    ContextType,
    RequireFields<QueryMyActiveBidsArgs, 'bidderId'>
  >
  justPurchased?: Resolver<ResolversTypes['Purchase'], ParentType, ContextType>
  auctionListing?: Resolver<
    ResolversTypes['Auction'],
    ParentType,
    ContextType,
    RequireFields<QueryAuctionListingArgs, 'auctionId'>
  >
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  placeBid?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationPlaceBidArgs, 'id' | 'bidderId' | 'bid'>
  >
  purchase?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationPurchaseArgs, 'id'>>
  createNewListing?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateNewListingArgs,
      'title' | 'price' | 'description' | 'prodType' | 'sellerId' | 'auctionTime'
    >
  >
  deleteListing?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteListingArgs, 'id'>
  >
  createNewPurchase?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateNewPurchaseArgs, 'total' | 'auctionId'>
  >
  answerSurvey?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationAnswerSurveyArgs, 'input'>
  >
  nextSurveyQuestion?: Resolver<
    Maybe<ResolversTypes['Survey']>,
    ParentType,
    ContextType,
    RequireFields<MutationNextSurveyQuestionArgs, 'surveyId'>
  >
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  surveyUpdates?: SubscriptionResolver<
    Maybe<ResolversTypes['Survey']>,
    'surveyUpdates',
    ParentType,
    ContextType,
    RequireFields<SubscriptionSurveyUpdatesArgs, 'surveyId'>
  >
}

export type SurveyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Survey'] = ResolversParentTypes['Survey']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isStarted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  currentQuestion?: Resolver<Maybe<ResolversTypes['SurveyQuestion']>, ParentType, ContextType>
  questions?: Resolver<Array<Maybe<ResolversTypes['SurveyQuestion']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyQuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SurveyQuestion'] = ResolversParentTypes['SurveyQuestion']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  prompt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  choices?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>
  answers?: Resolver<Array<ResolversTypes['SurveyAnswer']>, ParentType, ContextType>
  survey?: Resolver<ResolversTypes['Survey'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyAnswerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SurveyAnswer'] = ResolversParentTypes['SurveyAnswer']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  question?: Resolver<ResolversTypes['SurveyQuestion'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  userType?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  cardNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type PaginatedAuctionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PaginatedAuction'] = ResolversParentTypes['PaginatedAuction']
> = {
  auctions?: Resolver<Array<ResolversTypes['Auction']>, ParentType, ContextType>
  cursor?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type AuctionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Auction'] = ResolversParentTypes['Auction']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  prodType?: Resolver<ResolversTypes['ProdType'], ParentType, ContextType>
  sellerId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  currentHighestId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  auctionTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  status?: Resolver<ResolversTypes['ItemStatus'], ParentType, ContextType>
  auctionStartTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type ActiveBidResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActiveBid'] = ResolversParentTypes['ActiveBid']
> = {
  bid?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  bidderId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  auction?: Resolver<ResolversTypes['Auction'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type PurchaseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Purchase'] = ResolversParentTypes['Purchase']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  itemSold?: Resolver<ResolversTypes['Auction'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  Survey?: SurveyResolvers<ContextType>
  SurveyQuestion?: SurveyQuestionResolvers<ContextType>
  SurveyAnswer?: SurveyAnswerResolvers<ContextType>
  User?: UserResolvers<ContextType>
  PaginatedAuction?: PaginatedAuctionResolvers<ContextType>
  Auction?: AuctionResolvers<ContextType>
  ActiveBid?: ActiveBidResolvers<ContextType>
  Purchase?: PurchaseResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
