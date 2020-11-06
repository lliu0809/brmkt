import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Auction as GraphqlAuction, ProdType } from '../graphql/schema.types'

@Entity()
export class Auction extends BaseEntity implements GraphqlAuction {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100,
  })
  title: string

  @Column({
    default: 0.0,
  })
  price: number

  @Column({
    default: ""
  })
  description: string

  @Column({
    type: 'enum',
    enum: ProdType,
    default: ProdType.Other,
  })
  prodType: ProdType

  @Column({
  })
  seller: number

  @Column({
    nullable: true,
  })
  currentHighest: number

  @Column('simple-array', {
    nullable: true
  })
  bids: number[]

  @Column({
    default: 86400
  })
  auctionTime: number
}
