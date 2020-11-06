import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Order as GraphqlOrder, OrderType } from '../graphql/schema.types'

@Entity()
export class Order extends BaseEntity implements GraphqlOrder {
  __typename?: 'Order' | undefined
  ordertype: OrderType
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({})
  prodId: number

  @Column({})
  sellerId: number

  @Column({})
  buyerId: number

  @Column({
    type: 'enum',
    enum: OrderType,
  })
  orderType: OrderType
}
