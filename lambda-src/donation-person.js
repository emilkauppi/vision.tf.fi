//import { jsPDF } from "jspdf"
//import nodemailer from "nodemailer"
//import mg from "nodemailer-mailgun-transport"

require("dotenv").config()

// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
module.exports.handler = async function(event, context) {
  console.log("queryStringParameters", event.queryStringParameters)
  const statusCode = 200
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  }

  //let testAccount = await nodemailer.createTestAccount()
  /*
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  })
  Ä*/
  //console.log(testAccount)

  const descriptor = {
    from: `"axel.cedercreutz@gmail.com" <no-reply@gql-modules.com>`,
    to: "axel.cedercreutz@gmail.com",
    subject: `Axel sent you a message from gql-modules.com`,
    text: "Hello world",
  }

  sendMail(descriptor, e => {
    if (e) {
      callback(null, {
        statusCode: 500,
        body: e.message,
      })
    } else {
      callback(null, {
        statusCode: 200,
        body: "",
      })
    }
  })

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 200, // <-- Important!
      headers,
      body: "This was not a POST request!",
    }
  }

  /*
  if (
    !data.firstname ||
    !data.firstname ||
    !data.email ||
    !data.address ||
    !data.postCode ||
    !data.city ||
    !data.donationSum ||
    !data.date
  ) {
    const message = "Required information is missing!"

    console.error(message)

    return {
      statusCode,
      headers,
      body: JSON.stringify({
        status: "failed",
        message,
      }),
    }
  }
*/
  const data = JSON.parse(event.body)
  console.log(`Sending PDF report to ${data.email}`)
  /*
  const doc = new jsPDF()
  doc.text("Hello world!", 10, 10)
  console.log(doc)
  */
  /*const info = await transporter.sendMail({
    from: process.env.MAILGUN_SENDER,
    to: data.email,
    subject: "Your report is ready!",
    text: "See attached report PDF",
    attachments: [
      {
        filename: `report-${new Date().toDateString()}.pdf`,
        content: report,
        contentType: "application/pdf",
      },
    ],
  })

  console.log(`PDF report sent: ${info.messageId}`)*/

  return {
    // return null to show no errors
    statusCode: 200, // http status code
    body: JSON.stringify({
      msg: "Lets donate " + Math.round(Math.random() * 10),
    }),
    headers,
  }
}

// Now you are ready to access this API from anywhere in your Gatsby app! For example, in any event handler or lifecycle method, insert:
// fetch("/.netlify/functions/hello")
//    .then(response => response.json())
//    .then(console.log)
// For more info see: https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/#static-dynamic-is-a-spectrum
