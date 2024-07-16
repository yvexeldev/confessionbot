import bot from './config/bot';
import sequelize from './config/database';
import './actions';
import { parseMode } from '@grammyjs/parse-mode';


async function bootstrap() {
    // Syncing database
    await sequelize.sync({
        alter: true,
        logging: false
    });
    console.log('Database synced!');

    bot.api.config.use(parseMode('HTML'));

   
    // Bot start
    console.log('Bot starting... ');
    bot.start();
}

bootstrap();
