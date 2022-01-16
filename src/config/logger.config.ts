import { createLogger, format, transports } from 'winston';

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level.toUpperCase()}: ${message}`;
});

export const logger = createLogger({
	format: combine(label({ label: 'LOGGER' }), timestamp(), myFormat),
	transports: [new transports.Console()],
});
