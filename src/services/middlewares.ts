import { Context, NextFunction } from 'grammy';
import { User } from '../models/User';
import messages from '../libs/messages';

export const privateChatMiddleware = async (ctx: Context, next: NextFunction) => {
    if (ctx.chat?.type === 'private') {
        // If the chat is private, proceed to the next middleware or handler
        await next();
    }
};

export const isBannedMiddleware = async (ctx: Context, next: NextFunction) => {
    const user = await User.findByPk(ctx.from?.id);
    if (user && user.is_blocked) {
        console.log('BANNED!');
        await ctx.reply(messages.blocked);
        return;
    }
    await next();
};
