import fs from 'fs';
import { Markup, Telegraf } from 'telegraf';

import { logger } from '../config/logger.config';

export class BotService {
	constructor(private readonly bot: Telegraf) {
		this.bot = bot;

		this.launchBot();
		this.botCommands();
	}

	private startOptions = Markup.inlineKeyboard([Markup.button.pay('💸 Buy')]);

	private async launchBot(): Promise<void> {
		await this.bot.launch();
		logger.info('Bot launched');
	}

	private startKeyboard = Markup.keyboard([
		['😎 Team', '📑 White Paper'], // Row1 with 2 buttons
		['👨‍💼 Backers', '👨‍💻 Careers', '🇺🇦 Axelar Chat'], // Row2 with 2 buttons
	]);

	private botCommands(): void {
		this.bot.start(async (ctx) => {
			return await ctx.reply('Welcome to Axelar Telegram Bot', this.startKeyboard.oneTime().resize());
		});

		this.bot.hears('📑 White Paper', (ctx) =>
			ctx.replyWithHTML('https://axelar.network/wp-content/uploads/2021/07/axelar_whitepaper.pdf'),
		);
		this.bot.hears('👨‍💻 Careers', (ctx) => ctx.replyWithHTML('https://axelar.network/careers'));

		this.bot.hears('👨‍💼 Backers', (ctx) => ctx.replyWithPhoto({ source: fs.createReadStream('photo/backers.png') }));

		this.bot.hears('😎 Team', (ctx) => ctx.replyWithHTML('https://axelar.network/team'));

		this.bot.hears('🇺🇦 Axelar Chat', (ctx) => ctx.replyWithHTML('https://t.me/axelar_ro_ua'));
	}
}
