const client = require("@sendgrid/mail")
require("dotenv").config()

function sendEmail(client, senderEmail, senderName, pdf, contactPerson, formData) {
  const confirmation = sendConfirmationEmailToDonator(client, senderEmail, senderName, contactPerson, pdf)
  const copy = sendCopyToAdmin(client, senderEmail, senderName, contactPerson, pdf, formData)
  return Promise.all([confirmation, copy])
}

function sendConfirmationEmailToDonator(client, senderEmail, senderName, contactPerson, pdf) {
  return new Promise((fulfill, reject) => {
    const data = confirmationEmailContent(
      senderEmail,
      senderName,
      contactPerson,
      pdf
    )
    client
      .send(data)
      .then(([response, body]) => {
        fulfill(response)
      })
      .catch(error => reject(error))
  })
}

function sendCopyToAdmin(client, senderEmail, senderName, contactPerson, pdf, formData) {
  return new Promise((fulfill, reject) => {
    const data = formDataEmailContent(
      senderEmail,
      senderName,
      contactPerson,
      pdf,
      formData
    )
    client
      .send(data)
      .then(([response, body]) => {
        fulfill(response)
      })
      .catch(error => reject(error))
  })
}

function confirmationEmailContent(senderEmail, senderName, contactPerson, pdf) {
  return ({
    from: {
      email: senderEmail,
      name: senderName,
    },
    subject: "Netlify Function - Sendgrid Email",
    to: contactPerson.email,
    bcc: admin,
    templateId: "d-33584d7b4baa43c1983328625af08a54",
    dynamicTemplateData: {
      first_name: contactPerson.firstName,
      donationSum: contactPerson.donationSum,
    },
    attachments: [donationLetterAttachment(pdf, contactPerson)]
  })
}

function formDataEmailContent(senderEmail, senderName, contactPerson, pdf, formData) {
  return ({
    from: {
      email: senderEmail,
      name: senderName,
    },
    subject: "Kopia av donationsbrev och formulärdatan",
    to: admin,
    templateId: "d-33584d7b4baa43c1983328625af08a54",
    dynamicTemplateData: {
      first_name: contactPerson.firstName,
      donationSum: contactPerson.donationSum,
    },
    attachments: [donationLetterAttachment(pdf, contactPerson), formDataAttachment(formData)]
  })
}


function donationLetterAttachment(pdf, contactPerson) {
  return ({
    content: pdf,
    filename:
      "donationsbrev-" +
      contactPerson.firstName +
      "-" +
      contactPerson.lastName +
      ".pdf",
    type: "application/pdf",
    disposition: "attachment",
  })
}

function formDataAttachment(formData) {
  return ({
    content: Buffer.from(JSON.stringify(formData)).toString("base64"),
    filename:
      "donation-form.json",
    type: "application/json",
    disposition: "attachment",
  })
}

const admin = "emil.kauppi@tf.fi"

exports.handler = function(event, context, callback) {
  const {
    SENDGRID_API_KEY,
    SENDGRID_SENDER_EMAIL,
    SENDGRID_SENDER_NAME,
  } = process.env

  const body = JSON.parse(event.body)
  const pdf = body.pdf
  const contactPerson = body.contactPerson
  const formData = body.formData
  console.log("Donation form data", formData)

  client.setApiKey(SENDGRID_API_KEY)

  sendEmail(
    client,
    SENDGRID_SENDER_EMAIL,
    SENDGRID_SENDER_NAME,
    pdf,
    contactPerson,
    formData
  )
    .then(() =>
      callback(null, { statusCode: 200, body: "Emails sent" })
    )
    .catch(err => callback(err, null))
}
