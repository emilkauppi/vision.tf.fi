import React, { useState } from "react"
import MarkdownRemark, { MarkdownRemarkTextNode } from "./markdownremark"
import DayPickerInput from "react-day-picker/DayPickerInput"
import MomentLocaleUtils, { formatDate } from "react-day-picker/moment"
import "moment/locale/sv"
import "react-day-picker/lib/style.css"
import styles from "./donationform.module.css"

const DonationForm: React.FC<DonationFormProps> = ({ childContentfulDonationFormIntroductionTextTextNode }) => { 
    const [donationType, setDonationType] = useState<"individual" | "organization" | null>(null)

    const [donationSum, setDonationSum] = useState<number | null>(null)
    const [showingOtherDonationSum, setShowingOtherDonationSum] = useState(false)

    const onDonationSumChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "other") {
            setShowingOtherDonationSum(true)
        } else {
            setShowingOtherDonationSum(false)
            setDonationSum(parseInt(event.target.value))
        }
    }

    const twoWeeksAhead = new Date()
    twoWeeksAhead.setDate(twoWeeksAhead.getDate() + 14)
    const [paymentDate, setPaymentDate] = useState(twoWeeksAhead)

    const [showingPseudonymField, setShowingPseudonymField] = useState(false)
    const onVisibilityChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowingPseudonymField(event.target.value == "pseudonym")
    }

    return (
        <div className={styles.container}>
            <MarkdownRemark childMarkdownRemark={childContentfulDonationFormIntroductionTextTextNode.childMarkdownRemark} />
            <h2>Jag vill donera som</h2>
            <div className={styles.donationType}>
                <button
                    className={donationType == "individual" ? styles.donationTypeSelected : ""}
                    onClick={() => setDonationType("individual")}
                >
                    Privatperson
                </button>
                <button
                    className={donationType == "organization" ? styles.donationTypeSelected : ""}
                    onClick={() => setDonationType("organization")}
                >
                    Organisation
                </button>
            </div>
            { donationType &&
                <form className={styles.form}>
                    { donationType === "organization" &&
                        <fieldset>
                            <h2>Organisationsuppgifter</h2>
                            <p>
                                <label htmlFor="organization-name">Organisation</label>
                                <input type="text" name="organization-name" placeholder="Teknologverksamhet AB" />
                            </p>
                            <p>
                                <label htmlFor="organization-name">FO-nummer</label>
                                <input type="text" name="organization-name" placeholder="1234567-8" />
                            </p>
                            <p>
                                <label htmlFor="organization-address">Adress</label>
                                <input type="text" name="organization-address" placeholder="Otsvängen 22" />
                            </p>
                            <p>
                                <label htmlFor="organization-zip-code">Postnummer</label>
                                <input type="text" name="organization-zip-code" placeholder="02150" />
                            </p>
                            <p>
                                <label htmlFor="organization-city">Ort</label>
                                <input type="text" name="organization-city" placeholder="Esbo" />
                            </p>
                            <p>
                                <label htmlFor="organization-country">Land</label>
                                <input type="text" name="organization-country" placeholder="Finland" />
                            </p>
                        </fieldset>
                    }
                    <fieldset>
                        <h2>{donationType === "individual" ? "Kontaktuppgifter" : "Kontaktperson"}</h2>
                        <p>
                            <label htmlFor="first-name">Förnamn</label>
                            <input type="text" name="first-name" placeholder="Svakar" />
                        </p>
                        <p>
                            <label htmlFor="last-name">Efternamn</label>
                            <input type="text" name="last-name" placeholder="Teknolog" />
                        </p>
                        <p>
                            <label htmlFor="email">E-post</label>
                            <input type="email" name="email" placeholder="svakar@teknolog.fi" />
                        </p>
                        <p>
                            <label htmlFor="address">Adress</label>
                            <input type="text" name="address" placeholder="Otsvängen 22" />
                        </p>
                        <p>
                            <label htmlFor="zip-code">Postnummer</label>
                            <input type="text" name="zip-code" placeholder="02150" />
                        </p>
                        <p>
                            <label htmlFor="city">Ort</label>
                            <input type="text" name="city" placeholder="Esbo" />
                        </p>
                        <p>
                            <label htmlFor="country">Land</label>
                            <input type="text" name="country" placeholder="Finland" />
                        </p>
                    </fieldset>
                    <fieldset>
                        <h2>Donation</h2>
                        <p className={styles.donationSum}>
                            <input type="radio" id="500" name="donation-sum" value="500" onChange={onDonationSumChanged} />
                            <label htmlFor="500">500 €</label>
                            <input type="radio" id="1000" name="donation-sum" value="1000" onChange={onDonationSumChanged} />
                            <label htmlFor="1000">1000 €</label>
                            <input type="radio" id="5000" name="donation-sum" value="5000" onChange={onDonationSumChanged} />
                            <label htmlFor="5000">5000 €</label>
                            <input type="radio" id="10000" name="donation-sum" value="10000" onChange={onDonationSumChanged} />
                            <label htmlFor="10000">10 000 €</label>
                            <input type="radio" id="50000" name="donation-sum" value="50000" onChange={onDonationSumChanged} />
                            <label htmlFor="50000">50 000 €</label>
                            <input type="radio" id="other" name="donation-sum" value="other" onChange={onDonationSumChanged} />
                            <label htmlFor="other">Övrig summa</label>
                        </p>
                        { showingOtherDonationSum &&
                            <p>
                                <label htmlFor="other-sum">Övrig summa</label>
                                <input type="number" name="donation-sum" value="other-sum" />
                            </p>
                        }
                        <p>
                            { /* TODO: Default 14 days after today */ }
                            <label htmlFor="date">Förfallodatum</label>
                            <span>Utgångsmässigt är förfallodatumet för donationen två veckor, men ifall du vill kan du även specificera ett senare datum.</span>
                            <DayPickerInput
                                dayPickerProps={{
                                    firstDayOfWeek: 1,
                                    localeUtils: MomentLocaleUtils,
                                    locale: "se"
                                }}
                                value={formatDate(paymentDate)} />
                        </p>
                        <p className={styles.visibility}>
                            { /* TODO: Pluralis för organisationer */ }
                            <label htmlFor="visibility">Synlighet</label>
                            <span>Samtycker du till att ditt namn som donator kommer vara synlig på denna hemsida och i det nya nationshuset?</span>
                            <input type="radio" id="real-name" name="visibility" value="real-namme" onChange={onVisibilityChanged} />
                            <label htmlFor="real-name">Jag samtycker och donerar under eget namn</label>
                            <input type="radio" id="pseudonym" name="visibility" value="pseudonym" onChange={onVisibilityChanged} />
                            <label htmlFor="pseudonym">
                                Jag samtycker och donerar under följande pseudonym
                                { showingPseudonymField &&
                                    <input type="text" className={styles.pseudonym} placeholder="Svatta Teknolog" autoFocus={true} />
                                }
                            </label>
                            <input type="radio" id="anonymous" name="visibility" value="anonymous" onChange={onVisibilityChanged} />
                            <label htmlFor="anonymous">Jag donerar anonymt</label>
                        </p>
                    </fieldset>
                    { donationType === "individual" &&
                        <fieldset>
                            <h2>Grupp</h2>
                            <p>
                                <span>Ifall du donerar som grupp tillsammans med andra personer, fyll i gruppens namn. Val av grupp är valfritt.</span>
                                <label htmlFor="group-name">Gruppnamn</label>
                                <input type="text" name="group-name" />
                            </p>
                        </fieldset>
                    }
                    <fieldset>
                        <h2>Hälsning till Teknologföreningen</h2>
                        <p>
                            <span>Ifall du vill kan du skriva en hälsning till Teknologföreningen. Du kan till exempel berätta varför du donerade, dela med dig av visdomsord till framtidens phuxar eller berätta vad Teknologföreningen betyder för dig.</span>
                            <textarea name="greeting" rows={5}></textarea>
                        </p>
                    </fieldset>
                    <button className={styles.submit} type="submit">Skapa gåvobrev</button>
                    <p>När du klickar på <i>Skapa gåvobrev</i> genereras ett gåvobrev. Bekräftelse och underskrift sker i nästa steg.</p>
                </form>
            }
        </div>
    )
}

export default DonationForm

export interface DonationFormProps {
    childContentfulDonationFormIntroductionTextTextNode: MarkdownRemarkTextNode
}