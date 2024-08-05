import { Composer, Context } from 'grammy';
import bot from '../config/bot';
import { publishtoChannel } from '../services/message';
import { Message } from '../models/Message';
import { User } from '../models/User';

const composer = new Composer();

composer.on('callback_query:data', async (ctx: Context) => {
    if (!ctx.callbackQuery) return;
    const callbackData = ctx.callbackQuery.data;

    if (callbackData?.startsWith('accept-')) {
        const id = callbackData.split('-')[1];

        if (!ctx.callbackQuery.message) return;
        const originalText = ctx.callbackQuery.message.text;

        await ctx.editMessageText(`${originalText}\n\nAccepted by: ${ctx.from?.first_name} ✅`);

        const message = await Message.findByPk(id);
        if (message) await publishtoChannel(message);
        ctx.answerCallbackQuery(`You accepted message with id: ${id}`);
    } else {
        ctx.answerCallbackQuery('Unknown action.');
    }

    if (callbackData?.startsWith('reject-')) {
        const id = callbackData.split('-')[1];

        if (!ctx.callbackQuery.message) return;
        const originalText = ctx.callbackQuery.message.text;

        await ctx.editMessageText(`${originalText}\n\nRejected by: ${ctx.from?.first_name} ❌`);

        ctx.answerCallbackQuery(`You rejected message with id: ${id}`);
    } else {
        ctx.answerCallbackQuery('Unknown action.');
    }

    if (callbackData?.startsWith('block-')) {
        const id = callbackData.split('-')[1];

        if (!ctx.callbackQuery.message) return;
        const originalText = ctx.callbackQuery.message.text;
        const message = await Message.findByPk(id);
        if (message) {
            const user = await User.findByPk(message.from_id);
            if (user) await User.update({ is_blocked: true }, { where: { id: user.id } });
            await ctx.editMessageText(
                `${originalText}\n\nUser with id ${user?.telegram_id} blocked by: ${ctx.from?.first_name} ❌`
            );
        }

        ctx.answerCallbackQuery(`You blocked user with id: ${message?.from_id}`);

    } else {
        ctx.answerCallbackQuery('Unknown action.');
    }
});

bot.use(composer.middleware());
