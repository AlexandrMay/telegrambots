const Telegraf = require('telegraf');

const bot = new Telegraf('1027680659:AAEIQJBlzWdxiVdewFvR7CQMkTkpE4RznKg');

const axios = require('axios');

const fs = require('fs');

const helpMessage = `
*Simple API Bot*
/fortune - get a fortune cookie
/cat - get a random cat pic
/cat \`<text>\` - get a cat image with text
/dogbreeds - get list of dog breeds
/dog \`<breed>\` - get image of dog breed
`;

bot.help(ctx => {
    bot.telegram.sendMessage(ctx.from.id, helpMessage, {
        parse_mode: "Markdown"
    })
});

bot.command('fortune', ctx => {
    axios.get('http://yerkee.com/api/fortune')
        .then(res=>{
            ctx.reply(res.data.fortune);
        }).catch(e=>{
            console.log(e);
    });
});

bot.command('dogbreeds', ctx => {
    let rawdata = fs.readFileSync("./7.1 dogbreeds.json.json", "utf8");
    let data = JSON.parse(rawdata);
    let message = "Dog Breeds:\n";
    data.forEach(item=>{
        message += `-${item}\n`
    });
    ctx.reply(message);
});

bot.command("dog", ctx => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("You must give a dog breed as the second argument");
        return;
    }
    let breedInput = input[1];
    let rawdata = fs.readFileSync("./7.1 dogbreeds.json.json", "utf8");
    let data = JSON.parse(rawdata);

    if (data.includes(breedInput)){
        axios.get(`http://dog.ceo/api/breed/${breedInput}/images/random`)
            .then(res=>{
                ctx.replyWithPhoto(res.data.message);
            }).catch(e=>{
                console.log(e)
        })
    } else {
        let suggestion = data.filter(item=>{
            return item.startsWith(breedInput)});
        let message = `Did you mean:\n`;
        suggestion.forEach(item=>{
                message += `-${item}\n`
        });

        if (suggestion.length == 0){
            ctx.reply("Cannot find breed")
        } else {
            ctx.reply(message)
            }
    }
});

bot.command('cat', async ctx => {
    let input  = ctx.message.text;
    let inputArray = input.split(" ");

    if(inputArray.length == 1){
        try {
            let res = await axios.get('http://aws.random.cat/meow');
            ctx.replyWithPhoto(res.data.file);
        } catch (e) {
            console.log(e);
        }
    } else {
        inputArray.shift();
        input = inputArray.join(" ");
        ctx.replyWithPhoto(`https://cataas.com/cat/says/${input}`);
    }
});

bot.launch();