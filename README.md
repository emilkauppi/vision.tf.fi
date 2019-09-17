# vision.tf.fi
[https://vision.tf.fi vision.tf.fi] skapades hösten 2019 för TF:s fundraising för campusprojektet.

## TL;DR
* Nyckelord: [https://www.gatsbyjs.org GatsbyJS], [http://www.typescriptlang.org TypeScript], [https://graphql.org GraphQL]
* Källkod: https://github.com/Teknologforeningen/vision.tf.fi
* Innehåll/CMS: https://www.contentful.com
* Hosting: http://netlify.com


## Hur sidan fungerar
Sidan är skriven i [https://www.gatsbyjs.org GatsbyJS] med [http://www.typescriptlang.org TypeScript].  GatsbyJS är ett framework för att bygga statiska hemsidor med för 2019 aktuella webbteknologier som React. Idén med GatsbyJS är att man hämta data från en rad olika källor med hjälp av [https://graphql.org GraphQL] och sammanställa dem till en statisk sida när sidan byggs. Detta innebär att alla anrop till externa datakällor endast behöver köras en gång i kompileringsskedet, efter det kan de resulterande statiska filerna läggas upp på vilken tjänst som helst utan att någon serverkod behöver köras.

För [https://vision.tf.fi vision.tf.fi] specificeras sidans innehåll i [https://www.contentful.com Contentful]. På Contentful kan man specificera sidans innehåll utan tekniskt kunnande, men bara enligt den datamodell som specificerats. För att ändra layout och lägga till ny funktionalitet får den med tekniskt kunnande lägga till det i datamodellen och sedan uppdatera [https://github.com/Teknologforeningen/vision.tf.fi källkoden] för att kunna hantera och rendera sådan data på önskat sätt.

Sidan servas på [https://netlify.com Netlify]. [https://netlify.com Netlify] har tillgång till [https://github.com/Teknologforeningen/vision.tf.fi repon på GitHub] och bygger automatiskt om sidan när det master-branchen uppdateras. Det finns även en [https://en.wikipedia.org/wiki/Webhook webhook] från Contentful som gör en POST-request till Netlify för att bygga om sidan varje gång sidans innehåll uppdateras.
