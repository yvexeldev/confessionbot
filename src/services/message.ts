import { Context } from 'grammy';
import { newUser, setCrown } from './user';
import { Message } from '../models/Message';
import { envConfig } from '../config/env';

export function formatNumber(num: number): string {
    if (num > 99999) {
        return num.toString();
    }
    return num.toString().padStart(5, '0');
}

export async function addMessage(ctx: Context, text: string) {
    const user = await newUser(ctx);

    const message = await Message.create(
        {
            from_id: user.id,
            text
        },
        { include: [Message.associations.from_user] }
    );
    if (message) {
        if (user.messages.length >= 10 && !user.has_crown) {
            console.log('ADDED CROWN!');
            await setCrown(ctx);
        }
        return message;
    }
    return false;
}

export async function sendToGroup(ctx: Context, text: string) {
    await ctx.api.sendMessage(envConfig.group_id, text);
}

export function formatMessage(message: Message) {
    let nickname = message.from_user.nickname;

    if (message.from_user.nickname) {
        if (message.from_user.has_crown) nickname = '👑 ' + message.from_user.nickname + ' 👑';
    }
    return `${message.text}\n\n<b>№${formatNumber(message.id)} ${nickname ? nickname : ''}</b>`;
}
