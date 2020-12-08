// import { readFileSync } from 'fs'
import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { getRepository, MoreThan } from 'typeorm'
import { check } from '../../../common/src/util'
import { ActiveBid } from '../entities/ActiveBid'
import { Auction } from '../entities/Auction'
import { Purchase } from '../entities/Purchase'
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
    auctions: async (_, { cursor = 0 }) => {
      const limit = 15
      console.log(cursor)
      const auctions = await Auction.findAndCount({
        order: { id: 'ASC' },

        take: limit + 1,
        where: { id: MoreThan(cursor) },
      })

      const auctionReturn = auctions[0].slice(0, -1)
      const endCursor = auctions[0][limit - 1].id
      const moreData = auctions[0].length > limit

      for (const auction of auctionReturn) {
        const auctionEndDate = new Date(auction.timeCreated.getTime() + auction.auctionTime * 1000)
        auction.auctionStartTime = auctionEndDate.toString()
        await auction.save()
      }

      return {
        auctions: auctionReturn,
        cursor: endCursor,
        hasMore: moreData,
      }
    },
    auctionListing: async (_, { auctionId }) => {
      const auction = await Auction.findOneOrFail({ where: { id: auctionId } })
      return auction
    },
    myListings: async (_, { sellerId }) => {
      const allMyListings = await Auction.find({ where: { sellerId: sellerId } })
      return allMyListings
    },
    myActiveBids: async (_, { bidderId }) => {
      const allMyActiveBids = await ActiveBid.find({ where: { bidderId: bidderId } })
      return allMyActiveBids
    },
    myPurchases: async (_, { buyerId }) => {
      const allMyPurchases = await getRepository(Purchase)
        .createQueryBuilder('allMyPurchases')
        .leftJoinAndSelect('allMyPurchases.itemSold', 'itemSold')
        .where('itemSold.currentHighestId = :buyerId', { buyerId })
        .getMany()

      return allMyPurchases
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
    placeBid: async (_, { id, bidderId, bid }, ctx) => {
      const currentAuction = await Auction.findOne({ where: { id: id } })
      if (!currentAuction) {
        return false
      }

      if (currentAuction.price > bid) {
        return false
      }
      currentAuction.currentHighestId = bidderId
      currentAuction.price = bid
      await currentAuction.save()

      const activeBid = await ActiveBid.findOne({ where: { bidderId: bidderId } })
      if (!activeBid) {
        const newActiveBid = new ActiveBid()
        newActiveBid.bid = bid
        newActiveBid.bidderId = bidderId
        newActiveBid.auction = currentAuction
        await newActiveBid.save()
      } else {
        activeBid.bid = bid
        await activeBid.save()
      }

      return true
    },
    createNewListing: async (_, { title, price, description, prodType, sellerId, auctionTime }, ctx) => {
      const newListing = new Auction()
      newListing.title = title
      newListing.price = price
      newListing.description = description
      newListing.prodType = prodType
      newListing.sellerId = sellerId
      newListing.auctionTime = auctionTime
      await newListing.save()
      const auctionEndDate = new Date(newListing.timeCreated.getTime() + newListing.auctionTime * 1000)
      newListing.auctionStartTime = auctionEndDate.toString()
      await newListing.save()

      return true
    },
    deleteListing: async (_, { id }, ctx) => {
      const currentAuction = await Auction.findOne({ where: { id: id } })
      if (!currentAuction) {
        return false
      }
      const allActiveBidders = await getRepository(ActiveBid)
        .createQueryBuilder('allActiveBids')
        .leftJoinAndSelect('allActiveBids.auction', 'auction')
        .where('auction.id = :id', { id })
        .getMany()

      for (const bidder of allActiveBidders) {
        await bidder.remove()
      }
      await currentAuction.remove()

      return true
    },
    createNewPurchase: async (_, { total, auctionId }, ctx) => {
      const newPurchase = new Purchase()
      newPurchase.total = total

      const curAuction = await Auction.findOne({ where: { id: auctionId } })
      if (curAuction) {
        newPurchase.itemSold = curAuction
        curAuction.status = ItemStatus.Sold
      } else {
        return false
      }

      await newPurchase.save()
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
