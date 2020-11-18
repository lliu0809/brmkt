import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AuctionTopBid } from './AuctionTopBid'

@Entity()
export class ActiveBid extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
  })
  bid: number

  @Column({
  })
  bidderId: number

  @ManyToOne(() => AuctionTopBid, { eager: true })
  @JoinColumn()
  auctionTopBid: AuctionTopBid
}