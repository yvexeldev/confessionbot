import { Bot } from 'grammy';
import { envConfig } from './env';

const bot = new Bot(envConfig.bot_token);

export default bot;
