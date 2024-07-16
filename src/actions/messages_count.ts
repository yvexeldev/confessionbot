import { Composer, Context } from 'grammy';
import bot from '../config/bot';
import messages from '../libs/messages';
import keyboards from '../libs/keyboards';
import { changeStep, newUser } from '../services/user';
const composer = new Composer();

composer.hears('Cчeтчик cоoбщeний 📝', async (ctx: Context) => {
    const user = await newUser(ctx);
    console.log(user.messages);
    if (!user.messages) {
        user.messages = [];
    }
    if (user.messages) {
        if (user.messages.length <= 100) {
            await ctx.reply(messages.no_crown(user.messages.length));
            await ctx.reply(messages.menu, {
                reply_markup: keyboards.menu
            });
        } else {
            await ctx.reply(messages.message_counts(user.messages.length));
        }
    }
    await changeStep(ctx, 'start');
});

bot.use(composer.middleware());
