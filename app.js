

const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
const Extra = require('telegraf/extra')
const axios = require('axios')
const Keyboard = require('telegraf-keyboard');

const urlAPI = 'https://quiz.revolut1on.com/'

const tofQuizWizard = new WizardScene('tof-quiz-wizard',
  async (ctx) => {
      tofQuizData = await getTofQuizRandom()

      tofQuizStatement = `<i>${tofQuizData.quiz.statement}</i>\n<b>TRUE</b> or <b>FALSE</b>?`
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
    async (ctx) => {
      tofQuizId = ctx.callbackQuery.data.split(' ')[1]
      userAnswer = ctx.callbackQuery.data.split(' ')[0]
      userId = ctx.callbackQuery.from.id
      userFirstName = ctx.callbackQuery.from.first_name
      sayHello = `<a href="tg://user?id=${userId}">${userFirstName}</a>`

      dataAnswer = await postTofQuiz(tofQuizId, userAnswer, userId)
      tofQuizData = await getSpecificQuiz(tofQuizId)
      userAnswerPercent = await getUserAnswerPercent(tofQuizData.quiz.tofanswers)

      tofQuizStatement = `<i>${tofQuizData.quiz.statement}</i>\n\n`
      tofQuizExplanation = `${sayHello}, the answer is <b>${tofQuizData.quiz.correct_answer.toString().toUpperCase()}</b>.\n${tofQuizData.quiz.explanation} `
      readMoreExplanation = `<a href="${tofQuizData.quiz.reference}">Read More ...</a>\n\n`

      reply = `${tofQuizStatement+tofQuizExplanation+readMoreExplanation+userAnswerPercent}`

      ctx.editMessageCaption(`${reply}`,
        Extra.HTML())

      return ctx.scene.leave()
    }
)
const stage = new Stage([tofQuizWizard])

const bot = new Telegraf("1353377546:AAEpW187NhJD2n8ZI4KY6Xs3yUkyxbl8mXk")

 bot.start((ctx) =>{ 
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
    ctx.reply('<i>Your is : 0.000BTC</i>', Extra.HTML() .markup(Markup.inlineKeyboard([
      Markup.callbackButton('🏠 Menu', 'menu'),
    ])))
})



bot.hears('💵 Withdraw', (ctx) => {
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
  ctx.reply('<i>Your withdrawal will be avilable soon 😊</i>', Extra.HTML() .markup(Markup.inlineKeyboard([
      Markup.callbackButton('🏠 Menu', 'menu'),
    ])))
 })



 bot.hears('➕ Deposit', (ctx) => {
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
  ctx.reply('<i>Send 0.5BTC to:</i><i>19bmjXeTvFHXnPaKyaaVMhmur9oKz7MAru</i>', Extra.HTML() .markup(Markup.inlineKeyboard([
      Markup.callbackButton('🏠 Menu', 'menu'),
    ])))
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
  ctx.reply('<i>bro i am comming am still writing the code 😊</i>', Extra.HTML() .markup(Markup.inlineKeyboard([
      Markup.callbackButton('🏠 Menu', 'menu'),
    ])))
})

bot.hears('⛏💰💰mine', async (ctx) => {
  ctx.scene.enter('tof-quiz-wizard')
})

bot.launch()





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