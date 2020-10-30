import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ProdType, Selling as GraphqlSelling } from '../graphql/schema.types'

@Entity()
export class Selling extends BaseEntity implements GraphqlSelling{
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
    default: "",
  })
  description: string

  @Column({
    type: 'enum',
    enum: ProdType,
    default: ProdType.OTHER,
  })
  prodType: ProdType

  @Column({
    default: 0.0,
  })
  price: number

  @Column({
  })
  sellerId: number

}
