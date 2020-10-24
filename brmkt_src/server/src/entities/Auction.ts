import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Auction as GraphqlAuction, ProdType } from '../graphql/schema.types'

@Entity()
export class Auction extends BaseEntity implements GraphqlAuction{
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100,
  })
  prodName: string

  @Column({
    type: 'enum',
    enum: ProdType,
    default: ProdType.Other,
  })
  prodType: ProdType

  @Column({
  })
  prodId: number

  @Column({
    length: 100,
    nullable: true,
    default: "0",
  })
  base: string

  @Column('simple-array', { nullable: true })
  bids: string[]

  @Column({
    length: 15,
    nullable: true,
  })
  highestBid: string

  @Column({
    length: 15,
    nullable: true,
  })
  countDown: string

  @Column({
  })
  sellerId: number
}
