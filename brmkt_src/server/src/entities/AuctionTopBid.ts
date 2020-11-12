import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Auction } from './Auction'

@Entity()
export class AuctionTopBid extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Auction, { eager: true })
  @JoinColumn()
  auction: Auction

  @Column({
    default: 0.0,
  })
  topBid: number

  @Column({
    default: '',
  })
  auctionStartTime: string
}
