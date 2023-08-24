const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.sendMsg = async () => {
    try {
        const message = await client.messages.create({
            body: 'Sending a message through nodejs',
            from: process.env.TWILIO_NUMBER,
            to: process.env.MY_NUMBER
        }); 
    } catch (error) {
        console.error(error);
    }
}