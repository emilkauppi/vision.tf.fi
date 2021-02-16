import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib"

import fs from "fs"
import util from "util"

const readFile = util.promisify(fs.readFile)

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
  greeting,
  donationDate
*/

// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions

async function modifyPdfPerson(data) {
  const existingPdfBytes = await readFile("./test/test_person.pdf")
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()

  firstPage.drawText(
    data.contactPerson.firstName + " " + data.contactPerson.lastName,
    {
      x: 200,
      y: height / 2 + 168,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    }
  )

  firstPage.drawText(data.contactPerson.address, {
    x: 200,
    y: height / 2 + 144,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  firstPage.drawText(
    data.contactPerson.zipCode +
      ", " +
      data.contactPerson.city +
      ", " +
      data.contactPerson.country,
    {
      x: 385,
      y: height / 2 + 144,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    }
  )
  firstPage.drawText(data.contactPerson.email, {
    x: 225,
    y: height / 2 + 129,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })
  /*
  waiting implementation

  data.donationVisibility &&
    firstPage.drawText(data.contactPerson.donationVisibility, {
      x: 240,
      y: 800,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    })
  */
  firstPage.drawText(data.donationSum.toString(), {
    x: 250,
    y: height / 2 - 70,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
  /*
  for testing
  await fs.writeFile("./test/modified_person.pdf", pdfBytes)
  */
}

async function modifyPdfOrganization(data) {
  const existingPdfBytes = await readFile("./test/test_org.pdf")
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()

  firstPage.drawText(data.organization.organizationName, {
    x: 240,
    y: height / 2 + 180,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  firstPage.drawText(data.organization.organizationFoNumber, {
    x: 410,
    y: height / 2 + 180,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  firstPage.drawText(data.organization.organizationAddress, {
    x: 240,
    y: height / 2 + 166,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  firstPage.drawText(
    data.organization.organizationZipcode +
      ", " +
      data.organization.organizationCity +
      ", " +
      data.organization.organizationCountry,
    {
      x: 410,
      y: height / 2 + 166,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    }
  )

  firstPage.drawText(
    data.contactPerson.firstName + " " + data.contactPerson.lastName,
    {
      x: 240,
      y: height / 2 + 142,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    }
  )
  firstPage.drawText(data.contactPerson.email, {
    x: 410,
    y: height / 2 + 142,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })
  firstPage.drawText(data.contactPerson.address, {
    x: 240,
    y: height / 2 + 126,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })
  firstPage.drawText(
    data.contactPerson.zipCode +
      ", " +
      data.contactPerson.city +
      ", " +
      data.contactPerson.country,
    {
      x: 410,
      y: height / 2 + 126,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    }
  )
  /*
  waiting implementation

  data.donationVisibility &&
    firstPage.drawText(data.contactPerson.donationVisibility, {
      x: 240,
      y: 800,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    })
  */
  firstPage.drawText(data.donationSum.toString(), {
    x: 260,
    y: height / 2 - 35,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
  /*
  for testing
  await fs.writeFile("./test/modified_org.pdf", pdfBytes)
  */
}

async function generateCompanyData(data) {
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

  const pdfData = Buffer.from(await modifyPdfOrganization(data)).toString("base64")

  return {
    statusCode,
    headers,
    body: JSON.stringify({
      status: "success",
      pdfData,
    }),
  }
}

async function generatePersonData(data) {
  const statusCode = 200
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  }

  if (
    !data.contactPerson.firstName ||
    !data.contactPerson.lastName ||
    !data.contactPerson.email ||
    !data.contactPerson.address ||
    !data.contactPerson.zipCode ||
    !data.contactPerson.city ||
    !data.contactPerson.country ||
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

  const pdfData = Buffer.from(await modifyPdfPerson(data)).toString("base64")

  return {
    statusCode,
    headers,
    body: JSON.stringify({
      status: "success",
      pdfData,
    }),
  }
}

exports.handler = async function(event, context, callback) {
  console.log("queryStringParameters", event.queryStringParameters)

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 200, // <-- Important!
      headers,
      body: "This was not a POST request!",
    }
  }

  const data = JSON.parse(event.body)

  return data.donationType === "organization"
    ? await generateCompanyData(data)
    : await generatePersonData(data)
}

// Now you are ready to access this API from anywhere in your Gatsby app! For example, in any event handler or lifecycle method, insert:
// fetch("/.netlify/functions/hello")
//    .then(response => response.json())
//    .then(console.log)
// For more info see: https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/#static-dynamic-is-a-spectrum
