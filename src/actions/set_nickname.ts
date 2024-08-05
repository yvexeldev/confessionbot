import { Composer, Context } from 'grammy';
import bot from '../config/bot';
import { changeStep, checkStep, deleteNickname, getNickname } from '../services/user';
import messages from '../libs/messages';
import keyboards from '../libs/keyboards';

const composer = new Composer();
composer.hears('Hикнeйм', async (ctx: Context) => {
    await changeStep(ctx, 'new_nickname');

    // const checkstep = await checkStep(ctx, 'start');
    // if (!checkstep) {
    //     return;
    // }
    await changeStep(ctx, 'set_nickname');
    await ctx.reply(messages.change_nickname, {
        reply_markup: keyboards.set_nickname
    });
    const nickname = await getNickname(ctx);
    await ctx.reply(`👉 Ваш никнейм: ${nickname != '' ? nickname : '<i>Пусто</i>'}`);
});

composer.hears('Hoвый никнeйм', async (ctx: Context) => {
    const checkstep = await checkStep(ctx, 'set_nickname');
    if (!checkstep) {
        return;
    }

    await ctx.reply(messages.set_nickname, { reply_markup: keyboards.cancel_new_nickname });

    await changeStep(ctx, 'new_nickname');
});

composer.hears('Удaлить никнeйм 🚫', async (ctx: Context) => {
    const checkstep = await checkStep(ctx, 'set_nickname');
    if (!checkstep) {
        console.log('step err');
        return;
    }
    await deleteNickname(ctx);
    await ctx.reply(messages.delete_nickname);
    await ctx.reply(messages.menu, {
        reply_markup: keyboards.menu
    });
    await changeStep(ctx, 'start');
});

composer.hears('Oтмeнa ❌', async (ctx: Context) => {
    const checkstep = await checkStep(ctx, 'set_nickname');
    if (checkstep) {
        await ctx.reply(messages.menu, {
            reply_markup: keyboards.menu
        });
        await changeStep(ctx, 'start');
    }
    const secondcheck = await checkStep(ctx, 'new_nickname');
    if (secondcheck) {
        await ctx.reply(messages.change_nickname, {
            reply_markup: keyboards.set_nickname
        });
        const nickname = await getNickname(ctx);
        await ctx.reply(`👉 Ваш никнейм: ${nickname != '' ? nickname : '<i>Пусто</i>'}`);

        await changeStep(ctx, 'set_nickname');
    }
});

bot.use(composer.middleware());
