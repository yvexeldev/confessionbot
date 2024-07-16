// composer for command start

import { Composer } from 'grammy';
import { changeStep } from '../services/user';
import messages from '../libs/messages';
import bot from '../config/bot';
import keyboards from '../libs/keyboards';

const composer = new Composer();
composer.command('start', async (ctx) => {
    await changeStep(ctx, 'start');
    await ctx.reply(messages.start);
    await ctx.reply(messages.menu, {
        reply_markup: keyboards.menu
    });
});

bot.use(composer.middleware());
