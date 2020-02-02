const Telegraf = require('telegraf');

const bot = new Telegraf('1001983606:AAFq6fYBp1gmN0WC2CjQgVh80_DjR-rp46c');

bot.use((ctx, next)=>{
    ctx.state.apple = 5;
    console.log(ctx);
    ctx.reply("You used a bot");
    next(ctx);
});

bot.start((ctx)=>{
    //ctx.reply(ctx.from.first_name + " have entered the start command and it is a " + ctx.updateSubTypes[0]);
    ctx.reply(ctx.state.apple);
});

bot.help((ctx)=>{
    ctx.reply("You have entered the help command");
});

bot.settings((ctx)=>{
    ctx.reply("You have entered the settings command");
});

bot.command(["test", "Test", "test1"], (ctx)=>{
    ctx.reply("Hello world");
});

bot.hears("cat", (ctx)=>{
    ctx.reply("meow");
});

/*bot.on("text", (ctx)=>{
    ctx.reply("This is a text message");
});
*/
bot.on("sticker", (ctx)=>{
    ctx.reply("This is a sticker message");
});

bot.mention("botfather", (ctx)=>{
    ctx.reply("Mention method");
});

bot.phone("+380 664853398", (ctx)=>{
    ctx.reply("Phone method");
});

bot.hashtag("hash", (ctx)=>{
    ctx.reply("Hashtag method");
});

bot.launch();


