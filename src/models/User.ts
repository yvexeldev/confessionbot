import { Column, Table, Unique, Model, AllowNull, Default, HasMany } from 'sequelize-typescript';
import { Message } from './Message';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
    @Default(0)
    @Column
    count!: number;

    @Unique
    @AllowNull
    @Column
    telegram_id!: string;

    @Column
    first_name!: string;

    @AllowNull
    @Column
    last_name?: string;

    @AllowNull
    @Column
    username?: string;

    @Default('')
    @Column
    nickname!: string;

    @Default(false)
    @Column
    has_crown!: boolean;

    @Default(false)
    @Column
    is_blocked!: boolean;

    @Default('start')
    @Column
    step!: string;

    @HasMany(() => Message)
    messages!: Message[];
}
