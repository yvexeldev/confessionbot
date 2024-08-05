import { Composer } from 'grammy';
import bot from '../config/bot';
import { setCount } from '../services/message';
import { envConfig } from '../config/env';

const composer = new Composer();
// if admins send /setcount 1 it must set count to 1
composer.command('setcount', async (ctx) => {
    // check is bot in private group with specified id
    if (ctx.chat?.type === 'private' && ctx.chat.id !== +envConfig.group_id) {
        return;
    }

    const count = ctx.match;
    console.log({ count });
    if (count != undefined) {
        await bot.api.sendMessage(ctx.chat.id, `Установлено счётчик сообщений в ${count} сообщений`);
        await setCount(Number(count));
    }
});

bot.use(composer.middleware());
