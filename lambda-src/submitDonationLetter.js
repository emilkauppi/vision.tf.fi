const axios = require("axios")
const client = require("@sendgrid/mail")
require("dotenv").config()

function sendEmail(
  client,
  senderEmail,
  senderName,
  pdf,
  contactPerson,
  formData
) {
  const confirmation = sendConfirmationEmailToDonator(
    client,
    senderEmail,
    senderName,
    contactPerson,
    pdf,
    formData
  )
  const copy = sendCopyToAdmin(
    client,
    senderEmail,
    senderName,
    contactPerson,
    pdf,
    formData
  )
  return Promise.all([confirmation, copy])
}

function sendConfirmationEmailToDonator(
  client,
  senderEmail,
  senderName,
  contactPerson,
  pdf,
  formData
) {
  return new Promise((fulfill, reject) => {
    const data = confirmationEmailContent(
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

function sendCopyToAdmin(
  client,
  senderEmail,
  senderName,
  contactPerson,
  pdf,
  formData
) {
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

function confirmationEmailContent(
  senderEmail,
  senderName,
  contactPerson,
  pdf,
  formData
) {
  return {
    from: {
      email: senderEmail,
      name: senderName,
    },
    subject: "Netlify Function - Sendgrid Email",
    to: contactPerson.email,
    bcc: admin,
    templateId: "d-7cd54123ce274fb7b8d6ba2e0eed9ff4",
    dynamicTemplateData: {
      firstName: contactPerson.firstName,
      betong: (formData.donationSum / 180).toFixed(2),
      dansgolv: (formData.donationSum / 4815).toFixed(2),
      procent: (formData.donationSum / 6500000).toFixed(6),
    },
    attachments: [donationLetterAttachment(pdf, contactPerson)],
  }
}

function formDataEmailContent(
  senderEmail,
  senderName,
  contactPerson,
  pdf,
  formData
) {
  return {
    from: {
      email: senderEmail,
      name: senderName,
    },
    subject: "Kopia av donationsbrev och formulärdatan",
    to: admin,
    templateId: "d-7cd54123ce274fb7b8d6ba2e0eed9ff4",
    dynamicTemplateData: {
      firstName: contactPerson.firstName,
      betong: (formData.donationSum / 180).toFixed(2),
      dansgolv: (formData.donationSum / 4815).toFixed(2),
      procent: (formData.donationSum / 6500000).toFixed(6),
    },
    attachments: [
      donationLetterAttachment(pdf, contactPerson),
      formDataAttachment(formData),
    ],
  }
}

function donationLetterAttachment(pdf, contactPerson) {
  return {
    content: pdf,
    filename:
      "donationsbrev-" +
      contactPerson.firstName +
      "-" +
      contactPerson.lastName +
      ".pdf",
    type: "application/pdf",
    disposition: "attachment",
  }
}

function formDataAttachment(formData) {
  return {
    content: Buffer.from(JSON.stringify(formData)).toString("base64"),
    filename: "donation-form.json",
    type: "application/json",
    disposition: "attachment",
  }
}

const admin = "donation@tf.fi"

function persistDonation(pdf, formData) {
  console.log("Persisting donation", formData)
  const { DONATIONDB_URL, DONATIONDB_API_KEY } = process.env
  return axios.post(`${DONATIONDB_URL}/donations/new/`, {
    apiKey: DONATIONDB_API_KEY,
    pdf,
    formData,
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
  const formData = body.formData
  console.log("Donation form data", formData)
  client.setApiKey(SENDGRID_API_KEY)
  persistDonation(pdf, formData)
    .then(() =>
      sendEmail(
        client,
        SENDGRID_SENDER_EMAIL,
        SENDGRID_SENDER_NAME,
        pdf,
        contactPerson,
        formData
      )
    )
    .then(() =>
      callback(null, {
        statusCode: 200,
        body: "Emails sent and form data persisted",
      })
    )
    .catch(err => callback(err, null))
}
