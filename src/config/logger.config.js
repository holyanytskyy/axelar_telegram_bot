"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const { combine, timestamp, label, printf } = winston_1.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level.toUpperCase()}: ${message}`;
});
exports.logger = (0, winston_1.createLogger)({
    format: combine(label({ label: 'LOGGER' }), timestamp(), myFormat),
    transports: [new winston_1.transports.Console()],
});
