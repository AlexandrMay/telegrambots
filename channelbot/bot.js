// const Telegraf = require('telegraf');
// const axios = require('axios');
// const bot = new Telegraf('917418039:AAEV1l60GU_cXGADUupqdwWNqTCOmPhPPdM');
//
// bot.use(ctx => {
//     console.log(ctx.chat)
// });
//
// bot.launch();

const fetch = require('node-fetch');

let data = {
    chat_id: "-1001210384496",
    text: "Text"
};
let token = "917418039:AAEV1l60GU_cXGADUupqdwWNqTCOmPhPPdM";

(async () => {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
})();
