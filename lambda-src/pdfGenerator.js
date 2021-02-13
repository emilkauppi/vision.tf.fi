import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib"

import fs from "fs/promises"

/*
datastructure:
  donationType,
          contactPerson: {
              firstName,
              lastName,
              email,
              address,
              zipCode,
              city,
              country,
          },
          organization: {
              organizationName,
              organizationFoNumber,
              organizationAddress,
              organizationZipcode,
              organizationCity,
              organizationCountry
          },
          donationSum,
          donationVisibility,
          pseudonym,
          groupName,
          greeting
*/

// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions

async function modifyPdf() {
  const url = __dirname
  console.log("url:", url)
  const existingPdfBytes = await fs.readFile("./test/test.pdf")
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()
  firstPage.drawText("This text was added with JavaScript!", {
    x: 5,
    y: height / 2 + 300,
    size: 50,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
    rotate: degrees(-45),
  })

  const pdfBytes = await pdfDoc.save()
  await fs.writeFile("./test/modified.pdf", pdfBytes)
}

function generateCompanyData(data) {
  const statusCode = 200
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  }
  console.log(data)
  if (
    !data.contactPerson.firstName ||
    !data.contactPerson.lastName ||
    !data.contactPerson.email ||
    !data.contactPerson.address ||
    !data.contactPerson.zipCode ||
    !data.contactPerson.city ||
    !data.contactPerson.country ||
    !data.organization.organizationName ||
    !data.organization.organizationFoNumber ||
    !data.organization.organizationAddress ||
    !data.organization.organizationZipcode ||
    !data.organization.organizationCity ||
    !data.organization.organizationCountry ||
    !data.donationVisibility ||
    !data.donationSum
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

  return {
    statusCode,
    headers,
    body: JSON.stringify({
      status: "success",
      message: "Yay dlskaöjföalksjdfö",
    }),
  }
}

function generatePersonData(data) {
  const statusCode = 200
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  }

  if (
    !data.firstname ||
    !data.lastname ||
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

  return {
    statusCode,
    headers,
    body: JSON.stringify({
      status: "success",
      message: "Yay",
    }),
  }
}

exports.handler = async function(event, context, callback) {
  console.log("queryStringParameters", event.queryStringParameters)

  const statusCode = 200
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-disposition": 'attachment; filename="govobrev.pdf"',
    "Content-type": "application/pdf",
  }
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 200, // <-- Important!
      headers,
      body: "This was not a POST request!",
    }
  }

  const data = JSON.parse(event.body)

  await modifyPdf()

  return data.donationType === "organization"
    ? generateCompanyData(data)
    : generatePersonData(data)
}

// Now you are ready to access this API from anywhere in your Gatsby app! For example, in any event handler or lifecycle method, insert:
// fetch("/.netlify/functions/hello")
//    .then(response => response.json())
//    .then(console.log)
// For more info see: https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/#static-dynamic-is-a-spectrum
