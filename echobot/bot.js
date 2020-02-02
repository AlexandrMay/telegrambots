const Telegraf = require('telegraf');

const bot = new Telegraf('1091017328:AAHfqfuOZ5rTHu1Lx6vY8iM4q7ZBXYBp6bY');

const helpMessage = `
Say something to me
/start - start the bot
/help - command reference
`;

bot.use((ctx, next)=>{
    console.log(ctx.chat)
    //-338509429
    if (ctx.updateSubTypes[0] == "text"){
        bot.telegram.sendMessage(-338509429, ctx.from.username + " said: " + ctx.message.text);

    } else {
        bot.telegram.sendMessage(-338509429, ctx.from.username + " sent " + ctx.updateSubTypes[0]);
    }
    next();
});

bot.start((ctx)=>{
    ctx.reply("Hi I am Echo Bot");
    ctx.reply(helpMessage);
});

bot.help((ctx)=>{
    ctx.reply(helpMessage);
});
bot.command("echo", (ctx)=>{
    let input = ctx.message.text;
    let inputArray = input.split(" ");
    let message = "";
    if (inputArray.length == 1){
        message = "You said echo";
    } else {
        inputArray.shift();
        message = inputArray.join(" ");
    }

    ctx.reply(message);
});

bot.launch();


