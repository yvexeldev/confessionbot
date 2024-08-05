import { Composer, Context } from 'grammy';
import bot from '../config/bot';
import { changeNickname, changeStep, checkStep, getUser } from '../services/user';
import messages from '../libs/messages';
import keyboards from '../libs/keyboards';
import { addMessage, forwardToAnotherGroup, sendToGroup } from '../services/message';

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
        const text = `${message.text}\n\n<b>Nickname</b>: ${message.from_user?.nickname || '<i>unknown (no nickname)</i>'}\n<b>First Name:</b> ${ctx.from?.first_name || '<i>unknown</i>'}\n<b>Last Name:</b> ${ctx.from?.last_name || '<i>unknown</i>'}\n<b>Username:</b> ${'@' + ctx.from?.username || '<i>unknown</i>'}`;
        await sendToGroup(ctx, text, message.id);
        await forwardToAnotherGroup(ctx);
    }
    await ctx.reply(messages.message_sent, {
        reply_markup: keyboards.menu
    });
    await changeStep(ctx, 'start');
});

bot.use(composer.middleware());
