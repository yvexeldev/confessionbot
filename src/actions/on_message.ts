import { Composer, Context } from 'grammy';
import bot from '../config/bot';
import { changeNickname, changeStep, checkStep, getUser } from '../services/user';
import messages from '../libs/messages';
import keyboards from '../libs/keyboards';
import { addMessage, formatMessage, sendToGroup } from '../services/message';

const composer = new Composer();

composer.on('message', async (ctx: Context) => {
    const checkNicknameStep = await checkStep(ctx, 'new_nickname');
    if (checkNicknameStep) {
        const nickname = ctx.message?.text;
        if (!nickname) {
            return;
        }
        await changeNickname(ctx, nickname);
        await ctx.reply(messages.new_nickname);
        await ctx.reply(messages.menu, {
            reply_markup: keyboards.menu
        });
        await changeStep(ctx, 'start');
        return;
    }

    const text = ctx.message?.text;
    if (!text) {
        return;
    }
    const message = await addMessage(ctx, text);
    if (message) {
        const user = await getUser(Number(message.from_id));

        if (user) message.from_user = user;
        await sendToGroup(ctx, formatMessage(message));
    }
    await ctx.reply(messages.message_sent, {
        reply_markup: keyboards.menu
    });
    await changeStep(ctx, 'start');
});

bot.use(composer.middleware());
