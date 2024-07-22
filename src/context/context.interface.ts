import { Context } from 'telegraf'

export interface ISessionContext {
	date: string;
	timeStart: string;
	timeEnd: string;
	duration: number;
}

export interface IBotContext extends Context {
	session: ISessionContext
}