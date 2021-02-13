const { jsPDF } = require("jspdf/dist/jspdf.node") // will automatically load the node version

// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions

function generateCompanyData(data) {
  const statusCode = 200
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  }
  if (
    !data.companyName ||
    !data.foNumber ||
    !data.companyAddress ||
    !data.companyPostCode ||
    !data.companyCity ||
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
  var doc = new jsPDF()

  doc.setFontSize(40)
  doc.text("Hello world!", 10, 10)
  //doc.addImage("src/images/vision-tf.png", "PNG", 15, 40, 180, 180)
  doc.save("more.pdf")
  console.log(doc)
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

  return data.companyName ? generateCompanyData(data) : generatePersonData(data)
}

// Now you are ready to access this API from anywhere in your Gatsby app! For example, in any event handler or lifecycle method, insert:
// fetch("/.netlify/functions/hello")
//    .then(response => response.json())
//    .then(console.log)
// For more info see: https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/#static-dynamic-is-a-spectrum
