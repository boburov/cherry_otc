export const messages = {
  uz: {
    back: "⬅️ Orqaga",
    edit_profile: "✏️ Profilni tahrirlash",
    delete_profile: "🗑 Profilni o‘chirish",
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
    change_lang: "🌐 Tilni o‘zgartirish",
    langChanged: "✅ Til o‘zgartirildi!",
    walletProcessStart:
      "💳 Yangi TON wallet manzilni yuboring yoki /cancel bosing.",
    walletCancel: "🚫 Wallet kiritish jarayoni bekor qilindi.",
    my_profile: "👤 Mening Profilim",

    // Til tanlash
    chooseLanguage: "🌍 Iltimos, o‘zingizga qulay tilni tanlang:",
    languageChosen: (flag, lang) => `✅ Til ${flag} ${lang} ga o‘zgartirildi!`,

    // Deal bo‘limi
    create_deal: "📃 Kelishuv Yaratish",
    createDealAsk: "🛍 Yangi deal yaratish uchun ma’lumot yuboring:",
    dealCreated: "✅ Deal muvaffaqiyatli yaratildi!",
    dealListHeader: "📋 Sizning deal ro‘yxatingiz:",
    noDeals: "❌ Sizda hali hech qanday deal yo‘q.",
    dealDeleted: "🗑 Deal o‘chirildi!",
    dealError: "⚠️ Deal yaratishda xatolik yuz berdi.",
    dealProcessing: "⏳ Deal yaratilmoqda, iltimos kuting...",

    // Profil yangilanishi
    profileUpdated: "✅ Profil ma’lumotlari yangilandi!",
  },

  ru: {
    // Начало
    back: "⬅️ Назад",
    edit_profile: "✏️ Редактировать профиль",
    delete_profile: "🗑 Удалить профиль",
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
    change_lang: "🌐 Изменить язык",
    langChanged: "✅ Язык изменён!",
    walletProcessStart: "💳 Отправьте новый TON адрес или нажмите /cancel.",
    walletCancel: "🚫 Процесс ввода кошелька отменён.",
    my_profile: "👤 Мой Профиль",
    // Выбор языка
    chooseLanguage: "🌍 Пожалуйста, выберите удобный для вас язык:",
    languageChosen: (flag, lang) => `✅ Язык изменён на ${flag} ${lang}!`,

    // Раздел сделок\
    create_deal: "📃 Создать Сделку",
    createDealAsk: "🛍 Отправьте данные для создания новой сделки:",
    dealCreated: "✅ Сделка успешно создана!",
    dealListHeader: "📋 Ваш список сделок:",
    noDeals: "❌ У вас пока нет сделок.",
    dealDeleted: "🗑 Сделка удалена!",
    dealError: "⚠️ Произошла ошибка при создании сделки.",
    dealProcessing: "⏳ Сделка создается, пожалуйста, подождите...",

    // Обновление профиля
    profileUpdated: "✅ Данные профиля обновлены!",
  },

  en: {
    // Start
    back: "⬅️ Back",
    edit_profile: "✏️ Edit Profile",
    delete_profile: "🗑 Delete Profile",
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
    change_lang: "🌐 Change language",
    langChanged: "✅ Language changed!",
    walletProcessStart: "💳 Send your new TON address or press /cancel.",
    walletCancel: "🚫 Wallet input cancelled.",
    my_profile: "👤 My Profile",
    // Language selection
    chooseLanguage: "🌍 Please choose your preferred language:",
    languageChosen: (flag, lang) => `✅ Language changed to ${flag} ${lang}!`,

    // Deal section
    create_deal: "📃 Create Deal",
    createDealAsk: "🛍 Send details to create a new deal:",
    dealCreated: "✅ Deal successfully created!",
    dealListHeader: "📋 Your deals list:",
    noDeals: "❌ You have no deals yet.",
    dealDeleted: "🗑 Deal deleted!",
    dealError: "⚠️ Error occurred while creating the deal.",
    dealProcessing: "⏳ Creating deal, please wait...",

    // Profile update
    profileUpdated: "✅ Profile information updated!",
  },
};
