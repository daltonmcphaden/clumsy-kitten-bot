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

exports.handler = async function(event, context) {
    console.log("Before")
    sgMail.send(msg).then(() => {
        console.log('Email sent')
        return {
            statusCode: 200,
        };
    })
    .catch((error) => {
        console.error(error)
        return {
            statusCode: 404,
        };
    })
    console.log("after")
};