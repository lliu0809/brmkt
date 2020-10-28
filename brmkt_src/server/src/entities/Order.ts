import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Order as GraphqlOrder } from '../graphql/schema.types'

@Entity()
export class Order extends BaseEntity implements GraphqlOrder{
  @PrimaryGeneratedColumn()
  prodId: number

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

}
