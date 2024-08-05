import { Composer, Context } from 'grammy';
import bot from '../config/bot';
import messages from '../libs/messages';
import keyboards from '../libs/keyboards';
import { changeStep, newUser } from '../services/user';
const composer = new Composer();

composer.hears('Cчeтчик cоoбщeний 📝', async (ctx: Context) => {
    const user = await newUser(ctx);
    if (user) {
        if (user.count <= 100) {
            await ctx.reply(messages.no_crown(user.count));
            await ctx.reply(messages.menu, {
                reply_markup: keyboards.menu
            });
        } else {
            await ctx.reply(messages.message_counts(user.count));
        }
    }
    await changeStep(ctx, 'start');
});

bot.use(composer.middleware());
