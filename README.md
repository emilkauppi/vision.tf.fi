# vision.tf.fi
[vision.tf.fi](https://vision.tf.fi) skapades hösten 2019 för TF:s fundraising för campusprojektet.

## TL;DR
* Nyckelord: [GatsbyJS](https://www.gatsbyjs.org), [TypeScript](http://www.typescriptlang.org), [GraphQL](https://graphql.org)
* Källkod: https://github.com/Teknologforeningen/vision.tf.fi
* Innehåll/CMS: https://www.contentful.com
* Hosting: http://netlify.com


## Hur sidan fungerar
Sidan är skriven i [GatsbyJS](https://www.gatsbyjs.org) med [TypeScript](http://www.typescriptlang.org).  GatsbyJS är ett framework för att bygga statiska hemsidor med för 2019 aktuella webbteknologier som React. Idén med GatsbyJS är att man hämta data från en rad olika källor med hjälp av [GraphQL](https://graphql.org) och sammanställa dem till en statisk sida när sidan byggs. Detta innebär att alla anrop till externa datakällor endast behöver köras en gång i kompileringsskedet, efter det kan de resulterande statiska filerna läggas upp på vilken tjänst som helst utan att någon serverkod behöver köras.

För [vision.tf.fi](https://vision.tf.fi) specificeras sidans innehåll i [Contentful](https://www.contentful.com). På Contentful kan man specificera sidans innehåll utan tekniskt kunnande, men bara enligt den datamodell som specificerats. För att ändra layout och lägga till ny funktionalitet får den med tekniskt kunnande lägga till det i datamodellen och sedan uppdatera [källkoden](https://github.com/Teknologforeningen/vision.tf.fi) för att kunna hantera och rendera sådan data på önskat sätt.

Sidan servas på [Netlify](https://netlify.com). [Netlify](https://netlify.com) har tillgång till den här repon och bygger automatiskt om sidan när det master-branchen uppdateras. Det finns även en [webhook](https://en.wikipedia.org/wiki/Webhook) från Contentful som gör en POST-request till Netlify för att bygga om sidan varje gång sidans innehåll uppdateras.
