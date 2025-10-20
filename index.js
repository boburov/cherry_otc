import dotenv from "dotenv";
import { Markup, Telegraf } from "telegraf";
import prisma from "./db/config.db.js";
import { getTonTransactions } from "./functions/tonapi.js";
import axios from "axios";
dotenv.config();

const bot = new Telegraf("8422959228:AAF-awZANVmfHUnlnVzu3wMOLxLUfwAqtus");
  :
const walletSessions = new Map();

const messages = {
  uz: {
    startRegistered: "👋 Qaytganingiz bilan, do‘stim!",
    startUnregistered: "👋 Avval ro‘yxatdan o‘ting!",
    signupAsk: "🔗 Iltimos, TON manzilingizni yuboring:",
    signedUp:
      "✅ Muvaffaqiyatli ro‘yxatdan o‘tdingiz! Endi 🎁 Giftlarni sotib olishingiz mumkin!",
    alreadyExists: "⚠️ Siz allaqachon ro‘yxatdan o‘tgansiz.",
    invalidToken: "❌ Wallet manzil noto‘g‘ri.",
    profile: (u) =>
      `👤 Profil\n━━━━━━━━━━━━━━\n🆔 ID: ${u.telegramId}\n📛 Ism: ${u.firstName}\n🌐 Username: ${u.username}\n💬 Til: 🇺🇿 O‘zbek\n💰 Balans: ${u.balans} TON\n🪪 Wallet: ${u.wallet_uri}\n━━━━━━━━━━━━━━`,
    askWallet: "💳 Iltimos, TON wallet manzilingizni yuboring:",
    walletSaved:
      "✅ Wallet manzil saqlandi! Endi tranzaksiyalarni tekshiryapman...",
    noTx: "❌ Hech qanday tranzaksiya topilmadi.",
    txLogHeader: "📜 Oxirgi tranzaksiyalar:",
    languageSelect: "🌐 Iltimos, tilni tanlang:",
    langChanged: "✅ Til o‘zgartirildi!",
    walletProcessStart:
      "💳 Yangi TON wallet manzilni yuboring yoki /cancel bosing.",
    walletCancel: "🚫 Wallet kiritish jarayoni bekor qilindi.",
  },
  ru: {
    startRegistered: "👋 С возвращением, друг!",
    startUnregistered: "👋 Пожалуйста, зарегистрируйтесь сначала!",
    signupAsk: "🔗 Отправьте свой TON адрес:",
    signedUp:
      "✅ Вы успешно зарегистрированы! Теперь можете покупать 🎁 подарки!",
    alreadyExists: "⚠️ Вы уже зарегистрированы.",
    invalidToken: "❌ Неверный TON адрес.",
    profile: (u) =>
      `👤 Профиль\n━━━━━━━━━━━━━━\n🆔 ID: ${u.telegramId}\n📛 Имя: ${u.firstName}\n🌐 Username: ${u.username}\n💬 Язык: 🇷🇺 Русский\n💰 Баланс: ${u.balans} TON\n🪪 Wallet: ${u.wallet_uri}\n━━━━━━━━━━━━━━`,
    askWallet: "💳 Отправьте свой TON адрес:",
    walletSaved: "✅ Адрес сохранён! Проверяю транзакции...",
    noTx: "❌ Транзакции не найдены.",
    txLogHeader: "📜 Последние транзакции:",
    languageSelect: "🌐 Выберите язык:",
    langChanged: "✅ Язык изменён!",
    walletProcessStart: "💳 Отправьте новый TON адрес или нажмите /cancel.",
    walletCancel: "🚫 Процесс ввода кошелька отменён.",
  },
  en: {
    startRegistered: "👋 Welcome back, friend!",
    startUnregistered: "👋 Please register first!",
    signupAsk: "🔗 Please send your TON wallet address:",
    signedUp: "✅ Successfully registered! Now you can buy 🎁 gifts!",
    alreadyExists: "⚠️ You are already registered.",
    invalidToken: "❌ Invalid wallet address.",
    profile: (u) =>
      `👤 Profile\n━━━━━━━━━━━━━━\n🆔 ID: ${u.telegramId}\n📛 Name: ${u.firstName}\n🌐 Username: ${u.username}\n💬 Language: 🇬🇧 English\n💰 Balance: ${u.balans} TON\n🪪 Wallet: ${u.wallet_uri}\n━━━━━━━━━━━━━━`,
    askWallet: "💳 Please send your TON wallet address:",
    walletSaved: "✅ Wallet saved! Checking transactions...",
    noTx: "❌ No transactions found.",
    txLogHeader: "📜 Latest transactions:",
    languageSelect: "🌐 Please select your language:",
    langChanged: "✅ Language changed!",
    walletProcessStart: "💳 Send your new TON address or press /cancel.",
    walletCancel: "🚫 Wallet input cancelled.",
  },
};

const getLang = async (id) => {
  const user = await prisma.user.findFirst({
    where: { telegramId: String(id) },
  });
  return user?.lang || "uz";
};

bot.start(async (ctx) => {
  try {
    const user = await prisma.user.findFirst({
      where: { telegramId: String(ctx.from.id) },
    });

    if (!user) {
      return await ctx.reply(
        messages.uz.languageSelect,
        Markup.inlineKeyboard([
          [{ text: "🇺🇿 O‘zbek", callback_data: "lang_uz" }],
          [{ text: "🇷🇺 Русский", callback_data: "lang_ru" }],
          [{ text: "🇬🇧 English", callback_data: "lang_en" }],
        ])
      );
    }

    const lang = user.lang || "uz";
    const m = messages[lang];
    await ctx.reply(
      m.startRegistered,
      Markup.inlineKeyboard([
        [
          {
            text:
              lang === "uz"
                ? "👤 Profil"
                : lang === "ru"
                ? "👤 Профиль"
                : "👤 Profile",
            callback_data: "profile",
          },
        ],
        [{ text: "📃 Kelishuv Yaratish",callback_data:"deal" }],
        [
          {
            text:
              lang === "uz"
                ? "🎁 Mahsulotlar"
                : lang === "ru"
                ? "🎁 Товары"
                : "🎁 Store",
            callback_data: "store",
          },
        ],
      ])
    );
  } catch (error) {
    console.error("Start error:", error);
    await ctx.reply("❌ Database error!");
  }
});

bot.command("wallet", async (ctx) => {
  const telegramId = String(ctx.from.id);
  const user = await prisma.user.findFirst({
    where: { telegramId },
  });

  if (!user) return ctx.reply(messages.uz.startUnregistered);

  const lang = user.lang || "uz";
  const m = messages[lang];

  if (walletSessions.has(telegramId)) {
    return ctx.reply("⏳ Siz hozir wallet kiritish jarayonidasiz.");
  }

  walletSessions.set(telegramId, true);
  await ctx.reply(m.walletProcessStart);
});

bot.command("cancel", async (ctx) => {
  const telegramId = String(ctx.from.id);
  const user = await prisma.user.findFirst({
    where: { telegramId },
  });

  const lang = user?.lang || "uz";
  const m = messages[lang];

  if (walletSessions.has(telegramId)) {
    walletSessions.delete(telegramId);
    return ctx.reply(m.walletCancel);
  } else {
    return ctx.reply("⚠️ Sizda hech qanday wallet jarayoni yo‘q.");
  }
});

bot.on("text", async (ctx) => {
  const telegramId = String(ctx.from.id);

  if (walletSessions.has(telegramId)) {
    const user = await prisma.user.findFirst({
      where: { telegramId },
    });
    const lang = user?.lang || "uz";
    const m = messages[lang];

    const wallet = ctx.message.text.trim();

    try {
      const res = await axios.get(process.env.API_URI + wallet);
      if (res.data.ok) {
        await prisma.user.update({
          where: { telegramId },
          data: { wallet_uri: wallet },
        });
        walletSessions.delete(telegramId);
        return ctx.reply(m.walletSaved);
      } else {
        return ctx.reply(m.invalidToken);
      }
    } catch (err) {
      return ctx.reply(m.invalidToken);
    }
  }

  const user = await prisma.user.findFirst({
    where: { telegramId },
  });
  if (!user) return ctx.reply(messages.uz.languageSelect);

  try {
    const res = await axios.get(process.env.API_URI + ctx.message.text);
    const verify = await prisma.user.findFirst({
      where: { wallet_uri: ctx.message.text },
    });
    if (!verify) {
      if (res.data.ok) {
        await prisma.user.update({
          where: { telegramId },
          data: { wallet_uri: ctx.message.text },
        });

        const lang = user.lang || "uz";
        const m = messages[lang];
        await ctx.reply(
          m.signedUp,
          Markup.inlineKeyboard([
            [
              {
                text:
                  lang === "uz"
                    ? "🛍 Do‘konga tashrif buyurish"
                    : lang === "ru"
                    ? "🛍 Перейти в магазин"
                    : "🛍 Visit Store",
                callback_data: "store",
              },
            ],
          ])
        );
      } else {
        await ctx.reply(messages.uz.invalidToken);
      }
    } else {
      await ctx.reply(messages.uz.alreadyExists);
    }
  } catch (err) {
    await ctx.reply(messages.uz.invalidToken);
  }
});

bot.action("profile", async (ctx) => {
  const user = await prisma.user.findFirst({
    where: { telegramId: String(ctx.from.id) },
  });
  const lang = user?.lang || "uz";
  const m = messages[lang];

  if (!user) return ctx.reply(messages.uz.startUnregistered);

  const text = m.profile(user);

  await ctx.reply(
    text,
    Markup.inlineKeyboard([
      [
        {
          text:
            lang === "uz"
              ? "💳 Balansni To‘ldirish"
              : lang === "ru"
              ? "💳 Пополнить баланс"
              : "💳 Top Up",
          callback_data: "payme",
        },
        {
          text:
            lang === "uz"
              ? "🌐 Tilni O‘zgartirish"
              : lang === "ru"
              ? "🌐 Изменить язык"
              : "🌐 Change Language",
          callback_data: "change_lang",
        },
      ],
      [
        {
          text:
            lang === "uz"
              ? "🎁 Gift Sotib olish"
              : lang === "ru"
              ? "🎁 Купить подарок"
              : "🎁 Buy Gift",
          callback_data: "store",
        },
      ],
    ])
  );
});

bot.action("change_lang", async (ctx) => {
  await ctx.reply(
    messages.uz.languageSelect,
    Markup.inlineKeyboard([
      [{ text: "🇺🇿 O‘zbek", callback_data: "set_lang_uz" }],
      [{ text: "🇷🇺 Русский", callback_data: "set_lang_ru" }],
      [{ text: "🇬🇧 English", callback_data: "set_lang_en" }],
    ])
  );
});

bot.action(/set_lang_(uz|ru|en)/, async (ctx) => {
  const lang = ctx.match[1];
  await prisma.user.update({
    where: { telegramId: String(ctx.from.id) },
    data: { lang },
  });
  await ctx.reply(messages[lang].langChanged);
});

bot.action("payme", async (ctx) => {
  try {
    const user = await prisma.user.findFirst({
      where: { telegramId: String(ctx.from.id) },
    });
    const lang = user?.lang || "uz";
    const m = messages[lang];

    let wallet = user?.wallet_uri;
    if (!wallet) {
      await ctx.reply(m.askWallet);
      return;
    }

    const txs = await getTonTransactions(wallet);
    if (!txs.length) {
      return await ctx.reply(m.noTx);
    }

    let log = `${m.txLogHeader}\n━━━━━━━━━━━━━━\n`;
    txs.slice(0, 5).forEach((t, i) => {
      log += `#${i + 1}\n👤 ${t.from}\n💰 ${t.value} TON\n📅 ${
        t.date
      }\n━━━━━━━━━━━━━━\n`;
    });

    await ctx.reply(log);
  } catch (err) {
    console.error("Payme error:", err);
    await ctx.reply("❌ Transaction error");
  }
});

(async () => {
  try {
    await bot.launch(() => {
      console.log("🤖 Bot ishga tushdi! (UZ/RU/EN versiya)");
    });
  } catch (err) {
    console.error("Bot ishga tushmadi:", err);
  }
})();
