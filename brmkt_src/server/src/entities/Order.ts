import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Order as GraphqlOrder } from '../graphql/schema.types'

@Entity()
export class Order extends BaseEntity implements GraphqlOrder{
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    nullable: true,
  })
  prodId: number

  @Column({
  })
  sellerId: number

  @Column({
  })
  buyerId: number

  @Column({
    length: 100,
    nullable: true,
    default: "0",
  })
  price: string

  @Column({
    length: 100,
    nullable: true,
  })
  payment: string

}
