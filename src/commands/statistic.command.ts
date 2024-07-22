import { Telegraf } from 'telegraf'
import { IBotContext } from '../context/context.interface'
import { Command } from './command.class'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class StatisticCommand extends Command {
	constructor(bot: Telegraf<IBotContext>) {
		super(bot);
	}

	handle(): void {
		this.bot.action('statistic', async ctx => {
			const results = await prisma.workoutResults.findMany();

			if (results.length === 0) {
				ctx.reply('No workouts yet');
				return;
			}

			const table = results.map(result => {
				const { id, date, time_start, time_end, duration } = result;
				return `${id} | ${date} | ${time_start} | ${time_end} | ${duration} min`;
			}).join('\n');

			ctx.reply(`Workout Table:\n${table}`);

			const totalDuration = results.reduce((acc, result) => acc + result.duration, 0);
			const averageDuration = totalDuration / results.length;
			const longestWorkout = results.reduce((acc, result) => acc.duration > result.duration ? acc : result);
			const shortestWorkout = results.reduce((acc, result) => acc.duration < result.duration ? acc : result);

			ctx.reply(`Total workouts: ${results.length}\nTotal duration: ${totalDuration} minutes\nAverage duration: ${averageDuration} minutes\nLongest workout: ${longestWorkout.duration} minutes\nShortest workout: ${shortestWorkout.duration} minutes`);
		});
	}
}