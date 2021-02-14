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

export async function modifyPdfPerson(data) {
  const existingPdfBytes = await fs.readFile("./test/test_person.pdf")
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()

  firstPage.drawText(
    data.contactPerson.firstName + " " + data.contactPerson.lastName,
    {
      x: 240,
      y: height / 2 + 200,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    }
  )
  firstPage.drawText(data.contactPerson.address, {
    x: 240,
    y: height / 2 + 180,
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
      x: 400,
      y: 350,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    }
  )
  firstPage.drawText(data.contactPerson.email, {
    x: 240,
    y: 380,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })
  data.donationVisibility &&
    firstPage.drawText(data.contactPerson.donationVisibility, {
      x: 240,
      y: 800,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    })
  firstPage.drawText(data.contactPerson.donationSum, {
    x: 150,
    y: 600,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  const pdfBytes = await pdfDoc.save()
  //return pdfBytes
  await fs.writeFile("./test/modified_person.pdf", pdfBytes)
}

export async function modifyPdfOrganization(data) {
  const existingPdfBytes = await fs.readFile("./test/test_org.pdf")
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
  await fs.writeFile("./test/modified_org.pdf", pdfBytes)
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

  const pdfData = await modifyPdfOrganization(data)

  return {
    statusCode,
    headers,
    body: JSON.stringify({
      status: "success",
      message: "Yay dlskaöjföalksjdfö",
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

  const pdfData = await modifyPdfPerson(data)

  return {
    statusCode,
    headers,
    body: JSON.stringify({
      status: "success",
      message: "Yay",
      pdfData,
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

  return data.donationType === "organization"
    ? await generateCompanyData(data)
    : await generatePersonData(data)
}

// Now you are ready to access this API from anywhere in your Gatsby app! For example, in any event handler or lifecycle method, insert:
// fetch("/.netlify/functions/hello")
//    .then(response => response.json())
//    .then(console.log)
// For more info see: https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/#static-dynamic-is-a-spectrum
