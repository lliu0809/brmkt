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

export interface FetchAuctions_auctions_auction {
  __typename: "Auction";
  id: number;
  title: string;
  price: number;
  description: string;
  prodType: ProdType;
  seller: number;
  currentHighest: number | null;
  auctionTime: number;
  status: ItemStatus;
}

export interface FetchAuctions_auctions {
  __typename: "AuctionTopBid";
  topBid: number;
  auction: FetchAuctions_auctions_auction;
}

export interface FetchAuctions {
  auctions: FetchAuctions_auctions[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchAuctionListing
// ====================================================

export interface FetchAuctionListing_auctionListing_auction {
  __typename: "Auction";
  id: number;
  title: string;
  price: number;
  description: string;
  prodType: ProdType;
  seller: number;
  currentHighest: number | null;
  auctionTime: number;
  status: ItemStatus;
}

export interface FetchAuctionListing_auctionListing {
  __typename: "AuctionTopBid";
  topBid: number;
  auction: FetchAuctionListing_auctionListing_auction;
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
// GraphQL query operation: FetchBuyItNows
// ====================================================

export interface FetchBuyItNows_buyItNows {
  __typename: "BuyItNow";
  id: number;
  title: string;
  price: number;
  description: string;
  prodType: ProdType;
  seller: number;
  buyer: number | null;
  status: ItemStatus;
}

export interface FetchBuyItNows {
  buyItNows: FetchBuyItNows_buyItNows[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchBinListing
// ====================================================

export interface FetchBinListing_binListing {
  __typename: "BuyItNow";
  id: number;
  title: string;
  price: number;
  description: string;
  prodType: ProdType;
  seller: number;
  buyer: number | null;
  status: ItemStatus;
}

export interface FetchBinListing {
  binListing: FetchBinListing_binListing;
}

export interface FetchBinListingVariables {
  binId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchOrders
// ====================================================

export interface FetchOrders_orders {
  __typename: "Order";
  id: number;
  prodId: number;
  buyerId: number;
  sellerId: number;
  orderType: OrderType;
}

export interface FetchOrders {
  orders: FetchOrders_orders[];
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
  bid: number;
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
  seller: number;
  currentHighest: number | null;
  auctionTime: number;
  status: ItemStatus;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AuctionTopBid
// ====================================================

export interface AuctionTopBid_auction {
  __typename: "Auction";
  id: number;
  title: string;
  price: number;
  description: string;
  prodType: ProdType;
  seller: number;
  currentHighest: number | null;
  auctionTime: number;
  status: ItemStatus;
}

export interface AuctionTopBid {
  __typename: "AuctionTopBid";
  topBid: number;
  auction: AuctionTopBid_auction;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BuyItNow
// ====================================================

export interface BuyItNow {
  __typename: "BuyItNow";
  id: number;
  title: string;
  price: number;
  description: string;
  prodType: ProdType;
  seller: number;
  buyer: number | null;
  status: ItemStatus;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Order
// ====================================================

export interface Order {
  __typename: "Order";
  id: number;
  prodId: number;
  buyerId: number;
  sellerId: number;
  orderType: OrderType;
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

export enum OrderType {
  AUCTION = "AUCTION",
  BUYITNOW = "BUYITNOW",
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
