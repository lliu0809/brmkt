import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ItemType, Order as GraphqlOrder } from '../graphql/schema.types'

@Entity()
export class Order extends BaseEntity implements GraphqlOrder{
  @PrimaryGeneratedColumn()
  orderId: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
  })
  sellerId: number

  @Column({
  })
  buyerId: number

  @Column({
  })
  prodId: number

  @Column({
    type: 'enum',
    enum: ItemType,
  })
  itemType: ItemType

}
