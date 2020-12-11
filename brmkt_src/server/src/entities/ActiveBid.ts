import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Auction } from './Auction'

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

  @ManyToOne(() => Auction, { eager: true })
  @JoinColumn()
  auction: Auction
}