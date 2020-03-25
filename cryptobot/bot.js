const Telegraf = require('telegraf');
const axios = require('axios');
const bot = new Telegraf('1121680747:AAEqfUNd8T1b6az4f7O036BYRzkcEDGCbPc');

bot.command('test', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Main menu', {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'See Fruits list', callback_data: 'fruits'},
                    {text: 'See Meats list', callback_data: 'meats'}
                ]
            ]
        }
    })

});

bot.action('fruits', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, 'List of fruits: \n-Apples\n-Oranges\n-Pears', {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Back to menu', callback_data: 'menu'}
                ]
            ]
        }
    })
});

bot.action('menu', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, 'Main menu', {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'See Fruits list', callback_data: 'fruits'},
                    {text: 'See Meats list', callback_data: 'meats'}
                ]
            ]
        }
    })
});

bot.launch();