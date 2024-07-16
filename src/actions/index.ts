import bot from '../config/bot';
import { privateChatMiddleware } from '../services/middlewares';
bot.command('getid', async (ctx) => {
    await ctx.reply(`${ctx.chat.id}`);
});

bot.use(privateChatMiddleware);

export * from './start';
export * from './messages_count';
export * from './set_nickname';
export * from './on_message';
