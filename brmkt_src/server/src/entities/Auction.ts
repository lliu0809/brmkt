import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Auction as GraphqlAuction, ProdType } from '../graphql/schema.types'

@Entity()
export class Auction extends BaseEntity implements GraphqlAuction{
  @PrimaryGeneratedColumn()
  prodId: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100,
  })
  title: string

  @Column({
    type: 'enum',
    enum: ProdType,
    default: ProdType.OTHER,
  })
  prodType: ProdType

  @Column('simple-array', { nullable: true })
  bids: number[]

  @Column({
    default: 0.0,
  })
  price: number

  @Column({
    nullable: true,
  })
  auctionTime: number

  @Column({
  })
  sellerId: number

  @Column({
    nullable: true,
  })
  currentBuyerId: number

  @Column({
    default: ""
  })
  description: string
}
