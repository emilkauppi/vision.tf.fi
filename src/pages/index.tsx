import React, { FC } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Section from "../components/section"
import Statement from "../components/statement"
import Quote from "../components/quote"

const IndexPage: FC = () => (
  <Layout>
    <SEO title="Home" />
    <Section title="En hållbar framtid">
      <p>
        Ett mer öppet och livskraftigt TF förstärker svenskans ställning och
        närvaro i Otnäs genom positiv synlighet. Nationshuset Urdsgjallar står
        för 75 % av TF:s utgifter: ett nytt hus är billigare i drift och kan
        planeras modulärt för att motsvara dagens och framtidens behov.
      </p>
    </Section>
    <Section title="Ett öppet vardagsrum">
      <p>
        I Otnäs centrum kan vi bygga ett öppet vardagsrum för alla vid Aalto –
        en plats för möten, gemenskap och självförverkligande. Där kan
        restaurangverksamheten blomstra, man kan träffa sina vänner, ordna och
        delta i evenemang, och förstås tala svenska.
      </p>
    </Section>
    <Section title="Ett nytt hem för TF">
      <p>
        I ett nytt hus kan vi skapa utrymmen för TF:s medlemmar, en alumnilounge
        och en restaurang för samkväm. Traditionerna, kulturen och minnena från
        Urdsgjallar flyttar med medlemmarna till det nya huset.
      </p>
    </Section>
    <Statement>
      Vi vill skapa Träffpunkt Aalto — Ett vardagsrum för alla vid Aalto, ett
      hem för TF.
    </Statement>
    <Section title="TF idag">
      <p>
        Teknologföreningen (TF) är den svenskspråkiga nationen och det
        svenskspråkiga hemmet vid ett allt mer finsk- och engelskspråkigt
        Aalto-universitet. Vid Aalto-universitetet formas framtidens
        diplomingenjörer, ekonomer och konstindustrialister, medan TF erbjuder
        en unik gemenskap där självutveckling, företagsamhet och kultur
        blomstrar och den finlandssvenska identiteten formas.
      </p>
      <p>
        På TF finns alla Aalto-universitetets utbildningar representerade,
        vilket gör TF till en unik mötesplats för olika personer med ett
        gemensamt mål: lära känna nya personer och hitta sin plats i världen och
        samhället.
      </p>
      <p>
        TF bevakar de svenskspråkigas intressen vid Aalto-universitetet och på
        nationell nivå, lockar nya studerande från hela landet till
        Aalto-universitetet och fungerar som en naturlig länk till hela Norden.
      </p>
    </Section>
    <Quote quotee="Nils Jonatan Wenell, Teknologföreningens stiftare, 1872">
      Läroverket utbildar tjänstemannen, kamratskapet danar medborgaren.
    </Quote>
    <Section title="Nulägets utmaningar">
      <p>
        Då Tekniska Högskolan under 1950- och 60-talet flyttade till Otnäs
        byggde och flyttade TF till nationshuset Urdsgjallar. Nationshuset låg
        på centralt läge precis intill Dipoli, Tekniska Högskolans Studentkårs
        huvudbyggnad, och fungerade som “en korridor mellan högskolan och
        teknologbyn”.
      </p>
      <p>
        TF:s verksamhetsmiljö har ändrat dramatiskt sedan 60-talet: TF fungerar
        vid ett nytt och modernt universitet och nationshuset Urdsgjallar ligger
        avsides i dagens Otnäs, vars centrum är vid den nya metrostationen. Idag
        är Urdsgjallar dessutom nedslitet och i behov av grundrenovering. Huset
        står för 75 % av TF:s utgifter.
      </p>
      <p>
        TF:s verksamhetsmiljö har ändrat dramatiskt sedan 60-talet: TF fungerar
        vid ett nytt och modernt universitet och nationshuset Urdsgjallar ligger
        avsides i dagens Otnäs, vars centrum är vid den nya metrostationen. Idag
        är Urdsgjallar dessutom nedslitet och i behov av grundrenovering. Huset
        står för 75 % av TF:s utgifter.
      </p>
      <p>
        TF vill enligt sin långsiktiga strategi utvecklas tillsammans med sin
        omgivning. Utrymmena är inte ändamålsenliga för den öppenhet och roll
        vid Aalto som TF strävar efter. Ett nytt hus kan planeras modulärt för
        att motsvara dagens behov och framtidens verksamhet. Ett nytt hus är
        billigare i drift och kan ge en stabilare ekonomi.
      </p>
    </Section>
    <Section title="Träffpunkt Aalto som svar på utmaningarna">
      <p>
        Vi vill skapa Träffpunkt Aalto – ett vardagsrum för alla vid Aalto, ett
        hem för TF. En plats där kreativiteten flödar och nya kontakter knyts,
        en tvärvetenskaplig mötespunkt där studerande kan göra allt: skapa konst
        och musik, träffa företag, studera, sjunga snapsvisor, bygga nätverk,
        åta sig galna projekt, och främst av allt träffa sina vänner.
      </p>
      <p>
        Träffpunkt Aalto har något för alla. Det är en samlingspunkt för alla,
        dag och natt – platsen alla känner till och där alla vill vara. Det
        möjliggör givande möten, både väntade och oväntade. Träffpunkt Aalto är
        också en kravlös och inspirerande miljö där man kan träffa dina vänner
        och vara med i gemenskapen. På Träffpunkt Aalto kan man också
        förverkliga sig själv och testa sina vingar med otaliga
        förtroendeuppdrag och alla galna projekt man kan komma på.
      </p>
      <p>
        Ett bra läge och öppenhet för nya verksamhetsformer garanterar lyckad
        rekrytering och TF:s fortlevnad i framtidens Otnäs.
      </p>
    </Section>
    <Section title="Förverkligande av Träffpunkt Aalto">
      <p>
        TF:s nya nationshus planeras som en del av en större helhet i ett
        berikande samarbete med:
      </p>
      <ul>
        <li>
          KY—Kauppatieteiden Ylioppilaat (
          <a href="https://kyweb.fi">kyweb.fi</a>)
        </li>
        <li>
          AUS—Aalto-universitetets studentkår (
          <a href="https://ayy.fi">ayy.fi</a>)
        </li>
      </ul>
      <p>
        Det nya nationshuset blir ett hem för TF:s gamla traditioner och nya
        funktioner. Vi planerar en restaurang och pub, studieutrymmen, lounge,
        bastu, utrymmen för TF:s underföreningar, andra medlemsutrymmen och
        platser för teknologisk finurlighet. Dessutom stärker vi vår
        alumniverksamhet och samarbete med hjälp av en alumnilounge.
        Teknologföreningens utrymmen skapar en tydlig och självständig helhet i
        huset.
      </p>
      <p>
        Tillsammans med KY och AUS planeras utrymmen öppna för alla vid Aalto,
        utrymmen för föreningsaktiva, projektrum, studieutrymmen och mötesrum.
      </p>
      <p>
        TF har en hög självfinansieringsandel för sin del av projektet: TF har
        sparat in medel för en kommande utrymmesuppdatering och har i december
        2014 ansökt om detaljplaneförändring för sin tomt Otsvängen 22 för att
        finansiera ett nybygge. Utöver detta kommer TF att göra penninginsamling
        för att försäkra finansieringen för de ideella utrymmena.
      </p>
      <p>
        Tillsammans kan vi skapa Träffpunkt Aalto, ett svenskt rum vars dörrar
        står öppna för alla vid hela Aalto-universitetet. Det breda och
        kvalitativa programutbudet lockar nya medlemmar och gör också nationen
        känd i hela Finland. Tack vare nationens tvärvetenskaplighet och stora
        alumnnätverk knyts oväntade men givande kontakter för livet. För de som
        vill utmana sig själva, testa sina vingar och lära sig nya färdigheter
        erbjuder Teknologföreningen också förtroendeuppdrag och större projekt –
        något som värdesätts av näringslivet.
      </p>
    </Section>
    <Statement>
      Låt oss möjliggöra ett livskraftigt TF – i minst 150 år till.
    </Statement>
  </Layout>
)

export default IndexPage
