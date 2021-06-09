// Testando CodeQl

const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const SMTP_CONFIG = require('./config/smtp');
const refreshToken = SMTP_CONFIG.refreshToken;

const oAuth2Client = new google.auth.OAuth2(SMTP_CONFIG.clientId, SMTP_CONFIG.clientSecret, SMTP_CONFIG.uri);
oAuth2Client.setCredentials({refresh_token: refreshToken});

async function sendEmail() {

  try{
    const acessToken = await oAuth2Client.getAccessToken();
    
    const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: SMTP_CONFIG.type,
      user: SMTP_CONFIG.user,
      clientId: SMTP_CONFIG.clientId,
      clientSecret: SMTP_CONFIG.clientSecret,
      refreshToken: refreshToken,
      acessToken: acessToken
      }
    })
    
    const mailSent = {
        from: ' Talison Manoel <talison@gmail.com> ',
        to: 'talison@hotmail.com',
        subject: 'Teste',
        text: "Teste de envio de e-mail!",
        html: '<h1> Teste de envio de e-mail! </h1>'
    };

    const result = await transport.sendMail(mailSent);

    return result

  } catch(error){
    return error
  }

};

sendEmail()
  .then(result => console.log('Enviando Email . . .', result))
  .catch(error => console.log(error.message));

/*transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  }); */
 