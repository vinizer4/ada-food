const amqp = require('amqplib');
const nodemailer = require('nodemailer');

const rabbitMQConnectionString = 'amqp://localhost';
const rabbitMQQueue = 'notifications';

const smtpConfig = {
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: 'user@example.com',
    pass: 'password',
  },
};

async function sendEmail(email, subject, message) {
  const transporter = nodemailer.createTransport(smtpConfig);

  try {
    await transporter.sendMail({
      from: 'AdaFood <noreply@adafood.com>',
      to: email,
      subject: subject,
      text: message,
    });
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}


async function main() {
  try {
    const connection = await amqp.connect(rabbitMQConnectionString);
    const channel = await connection.createChannel();
    await channel.assertQueue(rabbitMQQueue, { durable: true });
    console.log('Waiting for messages in the queue...');

    channel.consume(rabbitMQQueue, (message) => {
      if (message !== null) {
        const notification = JSON.parse(message.content.toString());
        const { email, subject, text } = notification;

        sendEmail(email, subject, text).then(() => {
          channel.ack(message);
        });
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
