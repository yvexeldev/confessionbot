// composer for command start

import { Composer } from 'grammy';
import { changeStep, newUser } from '../services/user';
import messages from '../libs/messages';
import bot from '../config/bot';
import keyboards from '../libs/keyboards';

const composer = new Composer();
composer.command('start', async (ctx) => {
    const user = await newUser(ctx);
    await changeStep(ctx, 'start');
    await ctx.reply(messages.start,);
    await ctx.reply(messages.no_crown(user.messages ? user.messages.length : 0), {
        reply_markup: keyboards.menu
    });
});

bot.use(composer.middleware());
