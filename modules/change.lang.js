import { Markup } from "telegraf";
import { messages } from "../messages/language.js";
import prisma from "../db/config.db.js";

export function change_language(bot) {
  bot.action("change_language", async (ctx) => {
    await ctx.reply(
      "Tilni tanlang 🇬🇧🇺🇿🇷🇺",
      Markup.inlineKeyboard([
        [{ text: "🇺🇿 O'zbekcha", callback_data: "set_language_uz" }],
        [{ text: "🇷🇺 Русский", callback_data: "set_language_ru" }],
        [{ text: "🇬🇧 English", callback_data: "set_language_en" }],
      ])
    );
  });
}

export function set_language(bot) {
  bot.action(/set_language_(.+)/, async (ctx) => {
    const selectedLanguage = ctx.match[1];
    const telegramId = String(ctx.from.id);

    await prisma.user.updateMany({
      where: { telegramId },
      data: { lang: selectedLanguage },
    });
    await ctx.reply(
      `${messages[selectedLanguage].langChanged} ${selectedLanguage.toUpperCase()}`
    );
  });
}
