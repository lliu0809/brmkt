// import  DataLoader from "dataloader";
// import { Auction } from "../entities/Auction";
// //const DataLoader = require("dataloader")

// type BatchAuction= (ids: string[]) => Promise<Auction[]>;

// const batchAuctions: BatchAuction= async ids => {

//   const users = await Auction.findByIds(ids);
//   const userMap: { [key: string]: Auction} = {};
//   users.forEach(u => {
//     userMap[u.id] = u;
//   });

//   return ids.map(id => userMap[id]);
// };

// export const auctionLoader = () => new DataLoader<string, Auction>(batchAuctions);

import DataLoader from "dataloader";
import { Auction } from "../entities/Auction";
//const DataLoader = require("dataloader")

export const BatchAuction = () => new DataLoader<number, Auction>(async userKeys => {
  const users = await Auction.findByIds(userKeys as number[])
  const userIdMap: Record<number, Auction> = {}
  users.forEach(user => { userIdMap[user.id] = user })
  return userKeys.map(id => userIdMap[id])
})