import { Markup } from "telegraf";
import prisma from "../db/config.db.js";
import { messages } from "../messages/language.js";

export function userProfile(bot) {
  bot.action("profile", async (ctx) => {
    const telegramId = String(ctx.from.id);
    const user = await prisma.user.findFirst({
      where: { telegramId },
    });

    if (user) {
      await ctx.reply(
        messages[user.lang].profile(user),
        Markup.inlineKeyboard([
          [
            { text: messages[user.lang].back, callback_data: "main_menu" },
          ],
          [
            { text: messages[user.lang].edit_profile, callback_data: "edit_profile" },
          ],
          [
            { text: messages[user.lang].delete_profile, callback_data: "delete_profile" },
          ],
        ])
      );
    } else {
      await ctx.reply("❌ Foydalanuvchi topilmadi.");
    }
  });
}
