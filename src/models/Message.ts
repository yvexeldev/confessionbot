import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './User';

@Table({
    tableName: 'messages',
    timestamps: false
})
export class Message extends Model<Message> {
    @ForeignKey(() => User)
    @Column
    from_id!: number;

    @BelongsTo(() => User)
    from_user!: User;

    @Column
    text!: string;
}
