import dayjs from 'dayjs'
import { Command } from './command.class'
import { Markup, Telegraf } from 'telegraf'
import { IBotContext } from '../context/context.interface'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export class StopCommand extends Command {
	constructor(bot: Telegraf<IBotContext>) {
		super(bot);
	}

	handle(): void {
		this.bot.action('stop', async (ctx) => {
			const { session } = ctx;
			if (!session.date) {
				ctx.reply('No active session');
				return;
			}
			
			session.timeEnd = dayjs().format('YYYY-MM-DD HH:mm:ss');

			const timeStart = ctx.session.timeStart.split(' ')[1];
			const timeEnd = ctx.session.timeEnd.split(' ')[1];
			
			session.duration = dayjs(session.timeEnd).diff(session.timeStart, 'minutes');
			console.log(dayjs(`${session.timeEnd}`).diff(`${session.timeStart}`, 'minutes'));
			

			await prisma.workoutResults.create({
				data: {
					date: session.date,
					time_start: timeStart,
					time_end: timeEnd,
					duration: session.duration
				}
			});
			
			ctx.reply(`Your workout has ended at ${timeEnd}! Duration: ${session.duration} minutes. Great job!`, Markup.inlineKeyboard([ Markup.button.callback('Stats', 'statistic')]));
		});
	}
}