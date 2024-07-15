import bot from './config/bot';
import sequelize from './config/database';
import './composers';

async function bootstrap() {
    // Syncing database
    await sequelize.sync({
        alter: true,
        logging: false
    });
    console.log('Database synced!');

    bot.command('start', async (ctx) => {
        await ctx.reply(`${ctx.chat.id}`);
    });

    // Bot start
    console.log('Bot starting... ');
    bot.start();
}

bootstrap();
