import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ProdType, Selling as GraphqlSelling } from '../graphql/schema.types'

@Entity()
export class Selling extends BaseEntity implements GraphqlSelling{
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
  price: string

  @Column('simple-array', { nullable: true })
  comment: string[]

  @Column({
    nullable: true,
  })
  rating: number

  @Column({
  })
  sellerId: number

}
