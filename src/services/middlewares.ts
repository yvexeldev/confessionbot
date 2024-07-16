import { Context, NextFunction } from 'grammy';

export const privateChatMiddleware = async (ctx: Context, next: NextFunction) => {
    if (ctx.chat?.type === 'private') {
        // If the chat is private, proceed to the next middleware or handler
        await next();
    }
};
