"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.env = {
    gptKey: process.env.GPT_KEY,
    port: process.env.PORT || 3001,
};
