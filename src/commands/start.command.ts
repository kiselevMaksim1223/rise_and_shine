import { Markup, Telegraf } from 'telegraf'
import { IBotContext } from '../context/context.interface'
import { Command } from './command.class'
import dayjs from 'dayjs'

export class StartCommand extends Command {
	constructor(bot: Telegraf<IBotContext>) {
		super(bot);
	}
	
	handle() {
		this.bot.start(ctx => {
			ctx.reply('Welcome to the Workout Bot! Press button to start your workout!', Markup.inlineKeyboard([ Markup.button.callback('Start', 'start')]));
		});

		this.bot.action('start', ctx => {
			// ctx.session.timeStart = new Date().toISOString();
			ctx.session.date = dayjs().format('YYYY-MM-DD');
			ctx.session.timeStart = dayjs().format('YYYY-MM-DD HH:mm:ss');
			
			const timeStart = ctx.session.timeStart.split(' ')[1];
			ctx.editMessageText(`Your workout has started at ${timeStart}! Good job!`, Markup.inlineKeyboard([ Markup.button.callback('Stop', 'stop')]));
		}
		);
	}
}