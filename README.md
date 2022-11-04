# clumsy-kitten-bot

This is a bot that regularly issues an apology from a clumsy kitten to their owner for breaking an item in the house while their owner was at work.

## Technologies

- Cohere Generate API (https://cohere.ai/generate): Given a prompt, uses LLMs to generates a response.

- Netlify Scheduled Functions (https://docs.netlify.com/functions/scheduled-functions/): Serverless function that can be run on a recurring basis. Essentially a wrapper for AWS Lambda that is scheduled like a cron job.

- Twilio SendGrid (https://sendgrid.com/): Email automation

## Prompt Engineering

Given a common household item, pretend to be a kitten apologizing to their owner for breaking something in the house.

Item: Lamp
Apology: Hi this is Ellie, sorry for breaking the lamp! Have a nice day, Ellie

Item: TV
Apology: Hey mom this is Ellie, I accidentally broke the TV! See you later, Ellie

Item: Curtains
Apology: Hey dad it's Ellie, I tried climbing the curtains and it didn't go so well... Oops! Hope you're having a good day, Ellie

Item: Fridge
Apology: { GENERATED RESPONSE }

## Example Response Using Above Prompt

"Hi grandma! This is Ellie. I'm sorry for opening the fridge and putting my face in it. I don't know what came over me, hope you have a good day, Ellie"

"Hey mom, I accidentally scratched the fridge. Hope you have a nice day, Ellie"

"Hey dad, sorry for making you come home early, but I really broke the fridge, I think you should probably get home and see what happened! Bye, Ellie"

## Test Locally

To serve Netlify Scheduled Function locally: `netlify functions:serve`

## Next Steps

- Randomly select broken item from a list of common household items, so that it's not always the fridge

- Add people to mailing list, make more people laugh :)
