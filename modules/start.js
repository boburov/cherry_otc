import { Markup } from "telegraf";
import prisma from "../db/config.db.js";
import { messages } from "../messages/language.js";
export function registerStartModule(bot) {
  bot.start(async (ctx) => {
    const telegramId = String(ctx.from.id);

    const user = await prisma.user.findFirst({
      where: { telegramId },
    });

    console.log(await prisma.user.findMany({}));

    if (!user) {
      await prisma.user.create({
        data: {
          telegramId,
          firstName: ctx.from.first_name || "",
          username: ctx.from.username || telegramId,
        },
      });

      await ctx.reply(
        "Assalomu alaykum! Xush kelibsiz!\nO'zingizga qulay bo'lgan tilni tanlang 🇬🇧🇺🇿🇷🇺",
        Markup.inlineKeyboard([
          [{ text: "➕ Wallet Qo'shish", callback_data: "begin" }],
          [{ text: "🌐 Tilni o'zgartirish", callback_data: "change_language" }],
        ])
      );
    } else {
      console.log(user.lang);

      await ctx.reply(
        `${messages[user.lang].startRegistered}, @${ctx.from.username || "foydalanuvchi"}!`,
        Markup.inlineKeyboard([
          [
            {
              text: `${messages[user.lang].change_lang}`,
              callback_data: "change_language",
            },
          ],
          [
            {
              text: `${messages[user.lang].my_profile}`,
              callback_data: "profile",
            },
          ],
          [
            {
              text: `${messages[user.lang].create_deal}`,
              callback_data: "create_deal",
            },
          ],
        ])
      );
    }
  });
}
