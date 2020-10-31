import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { BuyItNow as GraphqlBuyItNow, ProdType } from '../graphql/schema.types'

@Entity()
export class BuyItNow extends BaseEntity implements GraphqlBuyItNow {
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
    default: "",
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
    nullable: true
  })
  buyerId: number
}
