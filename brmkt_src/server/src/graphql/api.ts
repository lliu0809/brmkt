import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { getRepository } from 'typeorm'
import { check } from '../../../common/src/util'
import { Auction } from '../entities/Auction'
import { AuctionTopBid } from '../entities/AuctionTopBid'
import { BuyItNow } from '../entities/BuyItNow'
import { Order } from '../entities/Order'
import { Survey } from '../entities/Survey'
import { SurveyAnswer } from '../entities/SurveyAnswer'
import { SurveyQuestion } from '../entities/SurveyQuestion'
import { User } from '../entities/User'
import { ItemStatus, Resolvers } from './schema.types'

export const pubsub = new PubSub()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  user: User | null
  request: Request
  response: Response
  pubsub: PubSub
}

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),
    buyItNows: async () => {
      const buyItNows = await BuyItNow.find()
      return buyItNows
    },
    auctions: async () => {
      const auctionTopBids = await AuctionTopBid.find()
      if(auctionTopBids.length !== 0) {
        return auctionTopBids
      }
      const auctions = await Auction.find()
      const newAuctionTopBids = auctions.map(auction => {
        const auctionTopBid = new AuctionTopBid()
        auctionTopBid.auction = auction
        auctionTopBid.topBid = auction.price
        return auctionTopBid.save()
      })

      return await Promise.all(newAuctionTopBids)
    },
    orders: async () => {
      const orders = await Order.find()
      return orders
    },
    auctionListing: async (_, { auctionId }) => {
      const auctionTopBid = await AuctionTopBid.findOneOrFail({ where: { id: auctionId } })
      return auctionTopBid
    },
    binListing: async (_, { binId }) => {
      const buyItNow = await BuyItNow.findOneOrFail({ where: { id: binId } })
      return buyItNow
    },
  },
  Mutation: {
    answerSurvey: async (_, { input }, ctx) => {
      const { answer, questionId } = input
      const question = check(await SurveyQuestion.findOne({ where: { id: questionId }, relations: ['survey'] }))

      const surveyAnswer = new SurveyAnswer()
      surveyAnswer.question = question
      surveyAnswer.answer = answer
      await surveyAnswer.save()

      question.survey.currentQuestion?.answers.push(surveyAnswer)
      ctx.pubsub.publish('SURVEY_UPDATE_' + question.survey.id, question.survey)

      return true
    },
    nextSurveyQuestion: async (_, { surveyId }, ctx) => {
      // check(ctx.user?.userType === UserType.Admin)
      const survey = check(await Survey.findOne({ where: { id: surveyId } }))
      survey.currQuestion = survey.currQuestion == null ? 0 : survey.currQuestion + 1
      await survey.save()
      ctx.pubsub.publish('SURVEY_UPDATE_' + surveyId, survey)
      return survey
    },
    placeBid: async (_, { id, bid }, ctx) => {
      const currentBid = await getRepository(AuctionTopBid)
        .createQueryBuilder('currentBid')
        .leftJoinAndSelect('currentBid.auction', 'auction')
        .where('auction.id = :id', { id })
        .getOne()
      if(!currentBid) {
        return false
      }

      if(currentBid.topBid > bid) {
        return false
      }
      currentBid.topBid = bid
      await currentBid.save()
      ctx.pubsub.publish('AUCTION_UPDATE', currentBid)
      return true
    },
    purchase: async (_, { id }, ctx) => {
      const buyItNow = await BuyItNow.findOne({ where: { id } })
      if(!buyItNow) {
        return false
      }
      buyItNow.status = ItemStatus.Sold
      await buyItNow.save()
      return true
    },
  },
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
  },
}
