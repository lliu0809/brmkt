import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Auction as GraphqlAuction, ItemStatus, ProdType } from '../graphql/schema.types'

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
  sellerId: number

  @Column({
    nullable: true,
  })
  currentHighestId: number

  @Column({
    default: 86400
  })
  auctionTime: number

  @Column({
    type: 'enum',
    enum: ItemStatus,
    default: ItemStatus.Notsold,
  })
  status: ItemStatus
}
