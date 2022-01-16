"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const fs_1 = __importDefault(require("fs"));
const telegraf_1 = require("telegraf");
const logger_config_1 = require("../config/logger.config");
class BotService {
    constructor(bot) {
        this.bot = bot;
        this.startOptions = telegraf_1.Markup.inlineKeyboard([telegraf_1.Markup.button.pay('💸 Buy')]);
        this.startKeyboard = telegraf_1.Markup.keyboard([
            ['😎 Team', '📑 White Paper'],
            ['👨‍💼 Backers', '👨‍💻 Careers', '🇺🇦 Axelar Chat'], // Row2 with 2 buttons
        ]);
        this.bot = bot;
        this.launchBot();
        this.botCommands();
    }
    launchBot() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bot.launch();
            logger_config_1.logger.info('Bot launched');
        });
    }
    botCommands() {
        this.bot.start((ctx) => __awaiter(this, void 0, void 0, function* () {
            return yield ctx.reply('Welcome to Axelar Telegram Bot', this.startKeyboard.oneTime().resize());
        }));
        this.bot.hears('📑 White Paper', (ctx) => ctx.replyWithHTML('https://axelar.network/wp-content/uploads/2021/07/axelar_whitepaper.pdf'));
        this.bot.hears('👨‍💻 Careers', (ctx) => ctx.replyWithHTML('https://axelar.network/careers'));
        this.bot.hears('👨‍💼 Backers', (ctx) => ctx.replyWithPhoto({ source: fs_1.default.createReadStream('photo/backers.png') }));
        this.bot.hears('😎 Team', (ctx) => ctx.replyWithHTML('https://axelar.network/team'));
        this.bot.hears('🇺🇦 Axelar Chat', (ctx) => ctx.replyWithHTML('https://t.me/axelar_ro_ua'));
    }
}
exports.BotService = BotService;
