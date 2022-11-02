const { schedule } = require('@netlify/functions');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const date = Date.now()
const converted = new Date(date)
const formatted = converted.toUTCString()

const msg = {
    to: process.env.SENDGRID_TO, // Change to your recipient
    from: process.env.SENDGRID_FROM, // Change to your verified sender
    subject: 'CronJob ' + formatted,
    html: 'This email was sent',
  }

const handler = async function(event, context) {
    sgMail.send(msg).then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })

    return {
        statusCode: 200,
    };
};

exports.handler = schedule("@hourly", handler);