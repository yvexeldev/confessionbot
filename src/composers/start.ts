// composer for command start

import { Composer } from 'grammy';
import { newUser } from '../services/user';
import messages from '../libs/messages';
import bot from '../config/bot';

const composer = new Composer();
composer.command('start', async (ctx) => {
    const user = await newUser(ctx);
    await ctx.reply(messages.start, {
        parse_mode: 'HTML'
    });
    await ctx.reply(messages.no_crown(user.messages ? user.messages.length : 0));
});

bot.use(composer.middleware());
