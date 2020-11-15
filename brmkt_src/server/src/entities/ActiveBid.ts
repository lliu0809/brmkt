import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
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

  @OneToOne(() => AuctionTopBid, { eager: true })
  @JoinColumn()
  auctionTopBid: AuctionTopBid
}