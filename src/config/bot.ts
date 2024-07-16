import { Bot } from 'grammy';
import { envConfig } from './env';

const bot = new Bot(envConfig.bot_token);
bot.catch((err) => console.log(err));
export default bot;
