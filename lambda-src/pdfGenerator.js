import { PDFDocument, rgb, StandardFonts } from "pdf-lib"
import fetch from "node-fetch"
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
      organizationZipCode,
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
  const { pdf, formData } = data
  console.log(pdf)
  const url = "http://localhost:8888" + pdf //if pdf not in live-version, use http://localhost:8888
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()

  firstPage.drawText(formData.contactPerson.firstName, {
    x: 190,
    y: height / 2 + 279,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  firstPage.drawText(formData.contactPerson.lastName, {
    x: 190,
    y: height / 2 + 264,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  firstPage.drawText(formData.contactPerson.address, {
    x: 405,
    y: height / 2 + 281,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  firstPage.drawText(
    formData.contactPerson.zipCode +
      ", " +
      formData.contactPerson.city +
      ", " +
      formData.contactPerson.country,
    {
      x: 440,
      y: height / 2 + 265,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    }
  )
  firstPage.drawText(formData.donationSum.toString(), {
    x: 205,
    y: height / 2 + 129,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })
  const date = formData.paymentDate.substring(0, 10)
  firstPage.drawText(date, {
    x: 280,
    y: height / 2 + 115,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })
  formData.donationVisibility === "visible" &&
    firstPage.drawText("X", {
      x: 146,
      y: height / 2 - 4,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    })
  formData.donationVisibility === "visible" &&
    firstPage.drawText("X", {
      x: 146,
      y: height / 2 - 16,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    })

  var today = new Date()
  firstPage.drawText(today.toLocaleString("se").substring(0, 10), {
    x: 362,
    y: height / 2 - 262,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  const pdfBytes = await pdfDoc.save()

  //for testing
  //await fs.writeFile("./test/modified_person.pdf", pdfBytes)
  return pdfBytes
}

async function modifyPdfOrganization(data) {
  const { pdf, formData } = data
  const url = "https://vision.tf.fi" + pdf //if pdf not in live-version, use http://localhost:8888
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()

  firstPage.drawText(formData.organization.organizationName, {
    x: 240,
    y: height / 2 + 180,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  firstPage.drawText(formData.organization.organizationFoNumber, {
    x: 410,
    y: height / 2 + 180,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  firstPage.drawText(formData.organization.organizationAddress, {
    x: 240,
    y: height / 2 + 166,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  firstPage.drawText(
    formData.organization.organizationZipCode +
      ", " +
      formData.organization.organizationCity +
      ", " +
      formData.organization.organizationCountry,
    {
      x: 410,
      y: height / 2 + 166,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    }
  )

  firstPage.drawText(
    formData.contactPerson.firstName + " " + formData.contactPerson.lastName,
    {
      x: 240,
      y: height / 2 + 142,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    }
  )
  firstPage.drawText(formData.contactPerson.email, {
    x: 410,
    y: height / 2 + 142,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })
  firstPage.drawText(formData.contactPerson.address, {
    x: 240,
    y: height / 2 + 126,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })
  firstPage.drawText(
    formData.contactPerson.zipCode +
      ", " +
      formData.contactPerson.city +
      ", " +
      formData.contactPerson.country,
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
  firstPage.drawText(formData.donationSum.toString(), {
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
  if (
    !data.formData.contactPerson.firstName ||
    !data.formData.contactPerson.lastName ||
    !data.formData.contactPerson.email ||
    !data.formData.contactPerson.address ||
    !data.formData.contactPerson.zipCode ||
    !data.formData.contactPerson.city ||
    !data.formData.contactPerson.country ||
    !data.formData.organization.organizationName ||
    !data.formData.organization.organizationFoNumber ||
    !data.formData.organization.organizationAddress ||
    !data.formData.organization.organizationZipCode ||
    !data.formData.organization.organizationCity ||
    !data.formData.organization.organizationCountry ||
    !data.formData.donationVisibility ||
    !data.formData.donationSum
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
  const pdfDataFormatted = Buffer.from(pdfData).toString("base64")

  return {
    statusCode,
    headers,
    body: JSON.stringify({
      status: "success",
      pdfData: pdfDataFormatted,
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
    !data.formData.contactPerson.firstName ||
    !data.formData.contactPerson.lastName ||
    !data.formData.contactPerson.email ||
    !data.formData.contactPerson.address ||
    !data.formData.contactPerson.zipCode ||
    !data.formData.contactPerson.city ||
    !data.formData.contactPerson.country ||
    !data.formData.donationVisibility ||
    !data.formData.donationSum
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
  const pdfDataFormatted = Buffer.from(pdfData).toString("base64")

  return {
    statusCode,
    headers,
    body: JSON.stringify({
      status: "success",
      pdfData: pdfDataFormatted,
    }),
  }
}

async function generateSignedDocument(data) {
  const pdfDoc = await PDFDocument.load(data.pdf)
  const signatureImgPng = await pdfDoc.embedPng(data.signature)
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const pngDims = signatureImgPng.scale(0.15)

  firstPage.drawImage(signatureImgPng, {
    x: 140,
    y: firstPage.getHeight() / 2 - 210,
    width: pngDims.width,
    height: pngDims.height,
  })

  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes).toString("base64")
  /*
  //for testing
  fs.writeFileSync("./test/signature-mod.pdf", pdfBytes)
  */
}

exports.handler = async function(event, context, callback) {
  var statusCode = 200
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  }
  if (event.httpMethod !== "POST") {
    return {
      statusCode, // <-- Important!
      body: "This was not a POST request!",
    }
  }
  const fontBytes = "https://vision.tf.fi/" //Find the font from assests!!
  const data = JSON.parse(event.body)
  if (data.type == "sign") {
    var pdfData = await generateSignedDocument(data)
    var formData = data.formData
    const body = JSON.stringify({
      pdf: pdfData,
      contactPerson: {
        email: formData.contactPerson.email,
        firstName: formData.contactPerson.firstName,
        lastName: formData.contactPerson.lastName,
        donationSum: formData.donationSum,
      },
      formData,
    })
    return {
      statusCode,
      headers,
      body,
    }
  }
  return data.formData.donationType === "organization"
    ? await generateCompanyData(data)
    : await generatePersonData(data)
}

// Now you are ready to access this API from anywhere in your Gatsby app! For example, in any event handler or lifecycle method, insert:
// fetch("/.netlify/functions/hello")
//    .then(response => response.json())
//    .then(console.log)
// For more info see: https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/#static-dynamic-is-a-spectrum
