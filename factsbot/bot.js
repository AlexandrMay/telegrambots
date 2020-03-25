const Telegraf = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('1096258073:AAGzilUFnU8HVn0Rq6P55Per4WF4KmVxAYw');

let dataStore = [];

async function updateStore() {
    await getData();
}

updateStore();

bot.command('fact', ctx => {
    let maxRow = dataStore.filter(item=>{
        return (item.row == '1' && item.col == '2');
    })[0].val;
    let k = Math.floor(Math.random() * maxRow) + 1;
    let fact = dataStore.filter(item=>{
        return (item.row == k && item.col == '5');
    })[0];
    let message = `
    Fact #${fact.row} : ${fact.val}
    `;
    ctx.reply(message);
});

bot.command('update', async ctx => {
    try{
        await getData();
        ctx.reply('updated');
    } catch (err) {
        ctx.reply('Error encountered');
    }
});

async function getData(){
    try{
        let res = await axios('https://spreadsheets.google.com/feeds/cells/12vUutGUWHyxQLGdrnmS_YJed5K59wtOKXy5WZLMXYxw/1/public/full?alt=json');
        let data = res.data.feed.entry;
        dataStore = [];
        data.forEach(item=>{
            dataStore.push({
                row: item.gs$cell.row,
                col: item.gs$cell.col,
                val: item.gs$cell.inputValue
            })
        });
    } catch (e) {
        console.log(e);
        throw new Error;
    }
}

bot.launch();



