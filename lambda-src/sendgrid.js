const client = require("@sendgrid/mail")
require("dotenv").config()

function sendEmail(client, message, senderEmail, senderName, attachment) {
  return new Promise((fulfill, reject) => {
    const data = {
      from: {
        email: senderEmail,
        name: senderName,
      },
      subject: "Netlify Function - Sendgrid Email",
      to: "axel.cedercreutz@gmail.com",
      templateId: "d-33584d7b4baa43c1983328625af08a54",
      dynamicTemplateData: {
        first_name: "Axel",
        donationSum: "50000",
      },
      attachments: [
        {
          content: attachment,
          filename: "gavobrev.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    }
    client
      .send(data)
      .then(([response, body]) => {
        fulfill(response)
      })
      .catch(error => reject(error))
  })
}

exports.handler = function(event, context, callback) {
  const {
    SENDGRID_API_KEY,
    SENDGRID_SENDER_EMAIL,
    SENDGRID_SENDER_NAME,
  } = process.env

  const body = JSON.parse(event.body)
  const message = body.message
  const attachment = body.attachment

  client.setApiKey(SENDGRID_API_KEY)

  sendEmail(
    client,
    message,
    SENDGRID_SENDER_EMAIL,
    SENDGRID_SENDER_NAME,
    attachment
  )
    .then(response => callback(null, { statusCode: response.statusCode }))
    .catch(err => callback(err, null))
}
