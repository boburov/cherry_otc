import { bot } from "./core/bot.js";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  try {
    await bot.launch(()=>{
      console.log("🤖 Bot ishga tushdi! (UZ/RU/EN versiya)");
    });
  } catch (err) {
    console.error("Bot ishga tushmadi:", err);
  }
})();
