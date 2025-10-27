import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { registerStartModule } from "../modules/start.js";
import { change_language, set_language } from "../modules/change.lang.js";
import { userProfile } from "../modules/profile.js";
dotenv.config();

export const bot = new Telegraf(process.env.BOT_TOKEN);

registerStartModule(bot);
change_language(bot);
set_language(bot);
userProfile(bot);