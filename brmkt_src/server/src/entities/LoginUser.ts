import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { LoginUser as GraphqlLoginUser, UserType } from '../graphql/schema.types'

@Entity()
export class LoginUser extends BaseEntity implements GraphqlLoginUser {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100,
  })
  email: string

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.User,
  })
  userType: UserType

  @Column({
    length: 100,
  })
  name: string

  @Column({
    nullable: true,
  })
  cardNumber: number

  @Column({
    length: 100,
  })
  password: string

  @Column({
    length: 100,
    nullable: true,
  })
  address: string

  @Column({
    length: 15,
    nullable: true,
  })
  phone: string
}
