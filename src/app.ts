import { config } from 'dotenv';
import { Telegraf } from 'telegraf';

import { BotService } from './services/bot.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const env = config();

const token = process.env.TOKEN;

if (token === undefined) {
	throw new Error('BOT_TOKEN must be provided!');
}

const bot = new Telegraf(token);

new BotService(bot);

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
