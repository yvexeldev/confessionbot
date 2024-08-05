import { Context, InlineKeyboard } from 'grammy';
import { newUser } from './user';
import { Message } from '../models/Message';
import { envConfig } from '../config/env';
import { User } from '../models/User';
import bot from '../config/bot';
import messages from '../libs/messages';
import count from '../libs/count';

export function formatNumber(num: number): string {
    if (num > 99999) {
        return num.toString();
    }
    return num.toString().padStart(5, '0');
}

export async function addMessage(ctx: Context, text: string) {
    const user = await newUser(ctx);

    const is_exists = await Message.findOne({ where: { from_id: user.id, text }, order: [['id', 'DESC']] });
    const allMessagesCount = await Message.count();
    console.log({ allMessagesCount, is_exists: is_exists?.id });
    if (is_exists?.id == allMessagesCount) {
        await ctx.reply(messages.already_sent);
        return false;
    }
    const message = await Message.create(
        {
            from_id: user.id,
            text
        },
        { include: [Message.associations.from_user] }
    );
    if (message) {
        return message;
    }
    return false;
}

export async function sendToGroup(ctx: Context, text: string, message_id?: number) {
    const keyboard = new InlineKeyboard()
        .text('Принять ✅', `accept-${message_id}`)
        .row()
        .text('Отклонить ❌', `reject-${message_id}`)
        .text('Заблокировать 🚫', `block-${message_id}`);

    await ctx.api.sendMessage(envConfig.group_id, text, {
        reply_markup: keyboard
    });
}

export async function formatMessage(message: Message) {
    let nickname;

    const user = await User.findByPk(message.from_id);
    if (user) {
        if (user.nickname) {
            console.log({ user: user.has_crown });
            if (user.has_crown) {
                nickname = '👑 ' + user.nickname + ' 👑';
            } else {
                nickname = user.nickname;
            }
        }
    }

    return `${message.text}\n\n<b>№${formatNumber(Number(count.count))} ${nickname ? nickname : ''}</b>`;
}

export async function addCount(message: Message) {
    try {
        const user = await User.findByPk(message.from_id);
        if (user) {
            const updated = await User.update({ count: user.count + 1 }, { where: { id: user.id }, returning: true });
            if (updated[1][0].count >= 100 && !updated[1][0].has_crown) {
                await User.update({ has_crown: true }, { where: { id: user.id } });
            }
        }
        count.count += 1;
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function publishtoChannel(message: Message) {
    try {
        await addCount(message);
        const msg = await formatMessage(message);
        await bot.api.sendMessage(envConfig.channel_id, msg);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function forwardToAnotherGroup(ctx: Context) {
    const message = ctx.message;

    if (!message) return;
    // await ctx.forwardMessage(envConfig.forward_group_id, message.message_id);
    await ctx.api.forwardMessage(envConfig.forward_group_id, Number(ctx.from?.id), message.message_id);
}

export async function setCount(newCount: number) {
    count.count = newCount;
}
