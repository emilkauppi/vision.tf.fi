# vision.tf.fi
[vision.tf.fi](https://vision.tf.fi) skapades hösten 2019 för TF:s fundraising för campusprojektet.
Den uppdaterades under 2021 och början av 2021 för att lägga till stöd för onlinebetalningar.

## Funktionalitet TL;DR
* Beskrivning av fundraisingen med CMS för att redigera innehållet
* Donering med kort-, bank- och mobilbetalningar via Paytrail
* Virtuell donatorvägg

## Teknisk TL;DR
* Komponenter: Frontend, CMS och backend för att lagra donationer
* Nyckelord: [GatsbyJS](https://www.gatsbyjs.org), [TypeScript](http://www.typescriptlang.org), [GraphQL](https://graphql.org), [Django](https://www.djangoproject.com), [PostgreSQL](https://www.postgresql.org), [Sendgrid](https://sendgrid.com), [Paytrail](https://www.paytrail.com/en/)
* Källkod: https://github.com/Teknologforeningen/vision.tf.fi
* Innehåll/CMS: https://www.contentful.com
* Hosting: https://heroku.com

## Hur sidan fungerar
Sidan är skriven i [GatsbyJS](https://www.gatsbyjs.org) med [TypeScript](http://www.typescriptlang.org).  GatsbyJS är ett framework för att bygga statiska hemsidor med för 2019 aktuella webbteknologier som React. Idén med GatsbyJS är att man hämta data från en rad olika källor med hjälp av [GraphQL](https://graphql.org) och sammanställa dem till en statisk sida när sidan byggs. Detta innebär att alla anrop till externa datakällor endast behöver köras en gång i kompileringsskedet, efter det kan de resulterande statiska filerna läggas upp på vilken tjänst som helst utan att någon serverkod behöver köras.

För [vision.tf.fi](https://vision.tf.fi) specificeras sidans innehåll i [Contentful](https://www.contentful.com). På Contentful kan man specificera sidans innehåll utan tekniskt kunnande, men bara enligt den datamodell som specificerats. För att ändra layout och lägga till ny funktionalitet får den med tekniskt kunnande lägga till det i datamodellen och sedan uppdatera [källkoden](https://github.com/Teknologforeningen/vision.tf.fi) för att kunna hantera och rendera sådan data på önskat sätt.

Varje gång innehållet på Contentful ändras uppdateras staging-versionen av frontenden på http://staging-vision-tf-fi.herokuapp.com.
Där kan man dubbelkolla att ändringarna ser korrekta ut innan man uppgraderar dem till produktionsversionen.
Själva uppgraderingen kan göras på Bärsbörsen (backenden).

Sidan servas på [Heroku](https://heroku.com).
Heroku har tillgång till den här repon och uppdaterar för varje commit till main-branchen automatiskt staging-versionerna av frontenden (http://staging-vision-tf-fi.herokuapp.com) och backenden (http://staging-barsborsen.herokuapp.com).
Frontenden kan uppgraderas genom Bärsbörsen.
Backenden uppgraderas genom att promotea staging-versionen till barsborsen-appen i Heroku.

## Lokal utvecklingsmiljö
Projektet består av två delar: frontenden och backenden.
Båda behöver köras lokalt på datorn.

### Frontenden
1. Installera [Node 16](https://nodejs.dev) och [yarn 1](https://yarnpkg.com).
1. I `frontend/`, installera alla dependencies med `yarn`.
1. Kopiera `.env.template` till `.env` och uppdatera alla nycklar till externa tjänster med korrekta värden.
1. Kör frontenden med `yarn start`

### Backenden
1. Installera en lokal PostgreSQL instans, antingen nativt på datorn eller som en container och ha igång den när du utvecklar.
1. Installera [pipenv](https://pypi.org/project/pipenv/) för att hantera Python-dependencies.
1. I backend-mappen, kör `pipenv install` för att installera alla dependencies.
1. Kör `pipenv shell` för att få en shell där `python` har alla dependencies installerade.
1. Kör `python manage.py migrate` för att skapa alla lokala databastables.
1. Kör `python manage.py runserver 3000` för att köra servern.

## Testing
Det finns ett (fåtal) test för backenden.
De körs med `python manage.py test` lokalt på ens egna dator.
I GitHub körs de med [Actionen](https://github.com/features/actions) i `.github/workflows/main.yml`.
