"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const telegraf_1 = require("telegraf");
const bot_service_1 = require("./services/bot.service");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const env = (0, dotenv_1.config)();
const token = process.env.TOKEN;
if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!');
}
const bot = new telegraf_1.Telegraf(token);
new bot_service_1.BotService(bot);
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
