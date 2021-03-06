import fs from 'fs';
import { Markup, Telegraf } from 'telegraf';

import { logger } from '../config/logger.config';

export class BotService {
	constructor(private readonly bot: Telegraf) {
		this.bot = bot;

		this.launchBot();
		this.botCommands();
	}

	private startOptions = Markup.inlineKeyboard([Markup.button.pay('πΈ Buy')]);

	private async launchBot(): Promise<void> {
		await this.bot.launch();
		logger.info('Bot launched');
	}

	private startKeyboard = Markup.keyboard([
		['π Team', 'π White Paper'], // Row1 with 2 buttons
		['π¨βπΌ Backers', 'π¨βπ» Careers', 'πΊπ¦ Axelar Chat'], // Row2 with 2 buttons
	]);

	private botCommands(): void {
		this.bot.start(async (ctx) => {
			return await ctx.reply('Welcome to Axelar Telegram Bot', this.startKeyboard.oneTime().resize());
		});

		this.bot.hears('π White Paper', (ctx) =>
			ctx.replyWithHTML('https://axelar.network/wp-content/uploads/2021/07/axelar_whitepaper.pdf'),
		);
		this.bot.hears('π¨βπ» Careers', (ctx) => ctx.replyWithHTML('https://axelar.network/careers'));

		this.bot.hears('π¨βπΌ Backers', (ctx) => ctx.replyWithPhoto({ source: fs.createReadStream('photo/backers.png') }));

		this.bot.hears('π Team', (ctx) => ctx.replyWithHTML('https://axelar.network/team'));

		this.bot.hears('πΊπ¦ Axelar Chat', (ctx) => ctx.replyWithHTML('https://t.me/axelar_ro_ua'));
	}
}
