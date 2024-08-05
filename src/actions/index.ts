import bot from '../config/bot';
import { isBannedMiddleware, privateChatMiddleware } from '../services/middlewares';
bot.command('getid', async (ctx) => {
    await ctx.reply(`${ctx.chat.id}`);
});
export * from './set_count';
export * from './inline_actions';
bot.use(privateChatMiddleware);
bot.use(isBannedMiddleware);
export * from './start';
export * from './messages_count';
export * from './set_nickname';
export * from './on_message';
