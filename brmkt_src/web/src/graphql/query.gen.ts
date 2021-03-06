/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchUserContext
// ====================================================

export interface FetchUserContext_self {
  __typename: "User";
  id: number;
  name: string;
  userType: UserType;
  email: string;
  password: string;
  cardNumber: string;
}

export interface FetchUserContext {
  self: FetchUserContext_self | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchAuctions
// ====================================================

export interface FetchAuctions_auctions_auctions {
  __typename: "Auction";
  id: number;
  title: string;
  price: number;
  description: string;
  prodType: ProdType;
  sellerId: number;
  currentHighestId: number | null;
  auctionTime: number;
  status: ItemStatus;
  auctionStartTime: string;
}

export interface FetchAuctions_auctions {
  __typename: "PaginatedAuction";
  auctions: FetchAuctions_auctions_auctions[];
  cursor: number;
  hasMore: boolean;
}

export interface FetchAuctions {
  auctions: FetchAuctions_auctions;
}

export interface FetchAuctionsVariables {
  cursor?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchAuctionListing
// ====================================================

export interface FetchAuctionListing_auctionListing {
  __typename: "Auction";
  id: number;
  title: string;
  price: number;
  description: string;
  prodType: ProdType;
  sellerId: number;
  currentHighestId: number | null;
  auctionTime: number;
  status: ItemStatus;
  auctionStartTime: string;
}

export interface FetchAuctionListing {
  auctionListing: FetchAuctionListing_auctionListing;
}

export interface FetchAuctionListingVariables {
  auctionId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchMyListings
// ====================================================

export interface FetchMyListings_myListings {
  __typename: "Auction";
  id: number;
  title: string;
  price: number;
  description: string;
  prodType: ProdType;
  sellerId: number;
  currentHighestId: number | null;
  auctionTime: number;
  status: ItemStatus;
  auctionStartTime: string;
}

export interface FetchMyListings {
  myListings: FetchMyListings_myListings[];
}

export interface FetchMyListingsVariables {
  sellerId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchMyActiveBids
// ====================================================

export interface FetchMyActiveBids_myActiveBids_auction {
  __typename: "Auction";
  id: number;
  title: string;
  price: number;
  description: string;
  prodType: ProdType;
  sellerId: number;
  currentHighestId: number | null;
  auctionTime: number;
  status: ItemStatus;
  auctionStartTime: string;
}

export interface FetchMyActiveBids_myActiveBids {
  __typename: "ActiveBid";
  bid: number;
  bidderId: number;
  auction: FetchMyActiveBids_myActiveBids_auction;
}

export interface FetchMyActiveBids {
  myActiveBids: FetchMyActiveBids_myActiveBids[];
}

export interface FetchMyActiveBidsVariables {
  bidderId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchMyPurchases
// ====================================================

export interface FetchMyPurchases_myPurchases_itemSold {
  __typename: "Auction";
  id: number;
  title: string;
  price: number;
  description: string;
  prodType: ProdType;
  sellerId: number;
  currentHighestId: number | null;
  auctionTime: number;
  status: ItemStatus;
  auctionStartTime: string;
}

export interface FetchMyPurchases_myPurchases {
  __typename: "Purchase";
  id: number;
  total: number;
  itemSold: FetchMyPurchases_myPurchases_itemSold;
}

export interface FetchMyPurchases {
  myPurchases: FetchMyPurchases_myPurchases[];
}

export interface FetchMyPurchasesVariables {
  buyerId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PlaceBid
// ====================================================

export interface PlaceBid {
  placeBid: boolean;
}

export interface PlaceBidVariables {
  id: number;
  bidderId: number;
  bid: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateNewListing
// ====================================================

export interface CreateNewListing {
  createNewListing: boolean;
}

export interface CreateNewListingVariables {
  title: string;
  price: number;
  description: string;
  prodType: ProdType;
  sellerId: number;
  auctionTime: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteListing
// ====================================================

export interface DeleteListing {
  deleteListing: boolean;
}

export interface DeleteListingVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Purchase
// ====================================================

export interface Purchase {
  purchase: boolean;
}

export interface PurchaseVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateNewPurchase
// ====================================================

export interface CreateNewPurchase {
  createNewPurchase: boolean;
}

export interface CreateNewPurchaseVariables {
  total: number;
  auctionId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchSurveys
// ====================================================

export interface FetchSurveys_surveys_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface FetchSurveys_surveys_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: FetchSurveys_surveys_currentQuestion_answers[];
}

export interface FetchSurveys_surveys {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: FetchSurveys_surveys_currentQuestion | null;
}

export interface FetchSurveys {
  surveys: FetchSurveys_surveys[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SurveySubscription
// ====================================================

export interface SurveySubscription_surveyUpdates_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface SurveySubscription_surveyUpdates_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: SurveySubscription_surveyUpdates_currentQuestion_answers[];
}

export interface SurveySubscription_surveyUpdates {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: SurveySubscription_surveyUpdates_currentQuestion | null;
}

export interface SurveySubscription {
  surveyUpdates: SurveySubscription_surveyUpdates | null;
}

export interface SurveySubscriptionVariables {
  surveyId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchSurvey
// ====================================================

export interface FetchSurvey_survey_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface FetchSurvey_survey_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: FetchSurvey_survey_currentQuestion_answers[];
}

export interface FetchSurvey_survey {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: FetchSurvey_survey_currentQuestion | null;
}

export interface FetchSurvey {
  survey: FetchSurvey_survey | null;
}

export interface FetchSurveyVariables {
  surveyId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AnswerSurveyQuestion
// ====================================================

export interface AnswerSurveyQuestion {
  answerSurvey: boolean;
}

export interface AnswerSurveyQuestionVariables {
  input: SurveyInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NextSurveyQuestion
// ====================================================

export interface NextSurveyQuestion_nextSurveyQuestion_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface NextSurveyQuestion_nextSurveyQuestion_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: NextSurveyQuestion_nextSurveyQuestion_currentQuestion_answers[];
}

export interface NextSurveyQuestion_nextSurveyQuestion {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: NextSurveyQuestion_nextSurveyQuestion_currentQuestion | null;
}

export interface NextSurveyQuestion {
  nextSurveyQuestion: NextSurveyQuestion_nextSurveyQuestion | null;
}

export interface NextSurveyQuestionVariables {
  surveyId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Auction
// ====================================================

export interface Auction {
  __typename: "Auction";
  id: number;
  title: string;
  price: number;
  description: string;
  prodType: ProdType;
  sellerId: number;
  currentHighestId: number | null;
  auctionTime: number;
  status: ItemStatus;
  auctionStartTime: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ActiveBid
// ====================================================

export interface ActiveBid_auction {
  __typename: "Auction";
  id: number;
  title: string;
  price: number;
  description: string;
  prodType: ProdType;
  sellerId: number;
  currentHighestId: number | null;
  auctionTime: number;
  status: ItemStatus;
  auctionStartTime: string;
}

export interface ActiveBid {
  __typename: "ActiveBid";
  bid: number;
  bidderId: number;
  auction: ActiveBid_auction;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PaginatedAuction
// ====================================================

export interface PaginatedAuction_auctions {
  __typename: "Auction";
  id: number;
  title: string;
  price: number;
  description: string;
  prodType: ProdType;
  sellerId: number;
  currentHighestId: number | null;
  auctionTime: number;
  status: ItemStatus;
  auctionStartTime: string;
}

export interface PaginatedAuction {
  __typename: "PaginatedAuction";
  auctions: PaginatedAuction_auctions[];
  cursor: number;
  hasMore: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Purchase
// ====================================================

export interface Purchase_itemSold {
  __typename: "Auction";
  id: number;
  title: string;
  price: number;
  description: string;
  prodType: ProdType;
  sellerId: number;
  currentHighestId: number | null;
  auctionTime: number;
  status: ItemStatus;
  auctionStartTime: string;
}

export interface Purchase {
  __typename: "Purchase";
  id: number;
  total: number;
  itemSold: Purchase_itemSold;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Survey
// ====================================================

export interface Survey_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface Survey_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: Survey_currentQuestion_answers[];
}

export interface Survey {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: Survey_currentQuestion | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SurveyQuestion
// ====================================================

export interface SurveyQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface SurveyQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: SurveyQuestion_answers[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ItemStatus {
  NOTSOLD = "NOTSOLD",
  SOLD = "SOLD",
}

export enum ProdType {
  BEARWEAR = "BEARWEAR",
  DORMSUPPLY = "DORMSUPPLY",
  ELECTRONICS = "ELECTRONICS",
  OTHER = "OTHER",
  TEXTBOOKS = "TEXTBOOKS",
}

export enum UserType {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface SurveyInput {
  questionId: number;
  answer: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
