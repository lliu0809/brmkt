import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Purchase as GraphqlPurchase } from '../graphql/schema.types'
import { AuctionTopBid } from './AuctionTopBid'

@Entity()
export class Purchase extends BaseEntity implements GraphqlPurchase {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
  })
  total: number

  @OneToOne(() => AuctionTopBid, { eager: true })
  @JoinColumn()
  itemSold: AuctionTopBid
}
