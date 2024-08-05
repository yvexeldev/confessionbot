import { BelongsTo, Column, Default, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './User';

@Table({
    tableName: 'messages',
    timestamps: false
})
export class Message extends Model {
    @ForeignKey(() => User)
    @Column
    from_id!: number;

    @BelongsTo(() => User)
    from_user!: User;

    @Column
    text!: string;

    @Default(0)
    @Column
    count!: number;
}
