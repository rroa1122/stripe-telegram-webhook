const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();

// Reemplaza estos valores por los tuyos
const telegramToken = '7982902696:AAHjPsq_4fV6f1d5k7jxn8A0tHWUqI9vXbg';
const telegramChannelLink = 'https://t.me/+wEGOVbbMxGE0Y2Qx';

const bot = new TelegramBot(telegramToken);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.post('/stripe-webhook', async (req, res) => {
  const event = req.body;

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const telegramId = session.metadata.telegram_id;

    try {
      await bot.sendMessage(telegramId, '¡Gracias por tu pago! Únete al canal aquí: ${telegramChannelLink}');
      console.log('Mensaje enviado a Telegram ID:', telegramId);
    } catch (err) {
      console.error('Error enviando mensaje:', err.message);
    }
  }

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});