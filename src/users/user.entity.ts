import * as bcrypt from 'bcrypt';
import { Order } from 'src/orders/orders.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { BCRYPT_SALT } from '../common/constants';
import { UserRoles } from '../common/enums/user-roles.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ default: UserRoles.CUSTOMER })
  role: UserRoles;

  @OneToMany((type) => Order, (order) => order.customer)
  orders: Order[];

  @BeforeInsert()
  async hashPassword() {
    this.email = this.email.toLowerCase();
    this.password = await bcrypt.hash(this.password, BCRYPT_SALT);
  }
}
