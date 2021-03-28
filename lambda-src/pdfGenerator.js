import { PDFDocument, rgb, StandardFonts } from "pdf-lib"
import fontkit from "@pdf-lib/fontkit"
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
  const { pdf, formData, font } = data
  const url = "https://vision.tf.fi" + pdf //if pdf not in live-version, use
  const urlFont = "https://vision.tf.fi" + font
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  pdfDoc.registerFontkit(fontkit)
  const fontBytes = await fetch(urlFont).then(res => res.arrayBuffer())
  const customFont = await pdfDoc.embedFont(fontBytes)

  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()

  firstPage.drawText(formData.contactPerson.firstName, {
    x: 217,
    y: height / 2 + 283,
    size: 10,
    font: customFont,
    color: rgb(0, 0, 0),
  })

  firstPage.drawText(formData.contactPerson.lastName, {
    x: 218,
    y: height / 2 + 257,
    size: 10,
    font: customFont,
    color: rgb(0, 0, 0),
  })

  firstPage.drawText(formData.contactPerson.email, {
    x: 218,
    y: height / 2 + 234,
    size: 10,
    font: customFont,
    color: rgb(0, 0, 0),
  })

  firstPage.drawText(formData.contactPerson.address, {
    x: 453,
    y: height / 2 + 284,
    size: 10,
    font: customFont,
    color: rgb(0, 0, 0),
  })

  firstPage.drawText(
    formData.contactPerson.zipCode +
      ", " +
      formData.contactPerson.city +
      ", " +
      formData.contactPerson.country,
    {
      x: 453,
      y: height / 2 + 253,
      size: 10,
      font: customFont,
      color: rgb(0, 0, 0),
    }
  )
  firstPage.drawText(formData.donationSum.toString(), {
    x: 265,
    y: height / 2 + 92,
    size: 10,
    font: customFont,
    color: rgb(0, 0, 0),
  })
  const date = formData.paymentDate.substring(0, 10)
  firstPage.drawText(date, {
    x: 280,
    y: height / 2 + 74,
    size: 10,
    font: customFont,
    color: rgb(0, 0, 0),
  })
  formData.donationVisibility === "visible" &&
    firstPage.drawText("X", {
      x: 146,
      y: height / 2 - 57,
      size: 12,
      font: customFont,
      color: rgb(0, 0, 0),
    })
  formData.donationVisibility === "visible" &&
    firstPage.drawText("X", {
      x: 146,
      y: height / 2 - 70,
      size: 12,
      font: customFont,
      color: rgb(0, 0, 0),
    })

  var today = new Date()
  firstPage.drawText(today.toLocaleString("se").substring(0, 10), {
    x: 362,
    y: height / 2 - 309,
    size: 12,
    font: customFont,
    color: rgb(0, 0, 0),
  })

  const pdfBytes = await pdfDoc.save()

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
  const { width, height } = firstPage.getSize()

  firstPage.drawImage(signatureImgPng, {
    x: 146,
    y: height / 2 - 250,
    width: pngDims.width,
    height: pngDims.height,
  })

  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes).toString("base64")
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
  const data = JSON.parse(event.body)
  console.log(data)
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
