const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const cohere = require('cohere-ai');
cohere.init(process.env.COHERE_API_KEY);

const items = require('../../household_items.json');

exports.handler = async function(event, context) {
    const response = await cohere.generate({
        model: 'xlarge',
        prompt: 'Given a common household item, pretend to be a kitten apologizing to their owner for breaking something in the house.\nItem: Lamp\nApology: Hi this is Ellie, sorry for breaking the lamp! Have a nice day, Ellie\n--\nItem: TV\nApology: Hey mom this is Ellie, I accidentally broke the TV! See you later, Ellie\n--\nItem: Curtains\nApology: Hey dad it\'s Ellie, I tried climbing the curtains and it didn\'t go so well... Oops! Hope you\'re having a good day, Ellie\n--\nItem:' + items[Math.floor(Math.random()*items.length)] + '\nApology:',
        max_tokens: 50,
        temperature: 2,
        k: 0,
        p: 0.75,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: ["--"],
        return_likelihoods: 'NONE'
      });
    const apology = response.body.generations[0].text
    console.log(`Prediction: ${apology}`);

    const date = Date.now()
    const converted = new Date(date)
    const formatted = converted.toUTCString()
    const recipients = process.env.SENDGRID_TO.split(' ')
    const msg = {
        to: recipients,
        from: process.env.SENDGRID_FROM,
        subject: 'Oopsie!',
        html: apology + "<br>Sent at: " + formatted,
    }
    await sgMail.send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.log(error)
        })

    return {
        statusCode: 200,
    };
};