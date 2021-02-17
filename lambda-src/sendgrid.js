const client = require("@sendgrid/mail")
require("dotenv").config()

function sendEmail(client, senderEmail, senderName, pdf, contactPerson) {
  return new Promise((fulfill, reject) => {
    const data = {
      from: {
        email: senderEmail,
        name: senderName,
      },
      subject: "Netlify Function - Sendgrid Email",
      to: contactPerson.email,
      bcc: "emil.kauppi@tf.fi",
      templateId: "d-33584d7b4baa43c1983328625af08a54",
      dynamicTemplateData: {
        first_name: contactPerson.firstName,
        donationSum: contactPerson.donationSum,
      },
      attachments: [
        {
          content: pdf,
          filename:
            "donationsbrev-" +
            contactPerson.firstName +
            "-" +
            contactPerson.lastName +
            ".pdf",
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
  const pdf = body.pdf
  const contactPerson = body.contactPerson

  client.setApiKey(SENDGRID_API_KEY)

  sendEmail(
    client,
    SENDGRID_SENDER_EMAIL,
    SENDGRID_SENDER_NAME,
    pdf,
    contactPerson
  )
    .then(response =>
      callback(null, { statusCode: response.statusCode, body: "success" })
    )
    .catch(err => callback(err, null))
}
