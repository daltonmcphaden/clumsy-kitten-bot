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

async function sendMail() {
    await sgMail.send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.log(error)
        })
}

exports.handler = async function(event, context) {
    await sendMail()
    return {
        statusCode: 200,
    };
};

module.exports.handler = schedule("43 21 * * *", handler);