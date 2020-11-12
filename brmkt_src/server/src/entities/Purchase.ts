import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Purchase as GraphqlPurchase } from '../graphql/schema.types'

@Entity()
export class Purchase extends BaseEntity implements GraphqlPurchase {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({})
  prodId: number
}
