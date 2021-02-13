import React, { MouseEvent, useEffect, useState } from "react"
import classNames from "classnames"
import MarkdownRemark, { MarkdownRemarkTextNode } from "./markdownremark"
import DayPickerInput from "react-day-picker/DayPickerInput"
import MomentLocaleUtils from "react-day-picker/moment"
import "moment/locale/sv"
import "react-day-picker/lib/style.css"
import styles from "./donationform.module.css"

const DonationForm: React.FC<DonationFormProps> = ({ childContentfulDonationFormIntroductionTextTextNode }) => { 
    const [donationType, setDonationType] = useState<"individual" | "organization" | null>(null)
    const [firstName, setFirstName, isFirstNameValid] = useFormField("", value => value !== "")
    const [lastName, setLastName, isLastNameValid] = useFormField("", value => value !== "")
    const [email, setEmail, isEmailValid] = useFormField("", value => value !== "")
    const [address, setAddress, isAddressValid] = useFormField("", value => value !== "")
    const [zipCode, setZipcode, isZipcodeValid] = useFormField("", value => !isNaN(Number(value)) && value.length === 5)
    const [city, setCity, isCityValid] = useFormField("", value => value !== "")
    const [country, setCountry, isCountryValid] = useFormField("", value => value !== "")

    const [donationSum, setDonationSum, isDonationSumValid] = useFormField("", value => !isNaN(Number(value)) && parseInt(value) > 0)
    const [showingOtherDonationSum, setShowingOtherDonationSum] = useState(false)

    const onDonationSumChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "other") {
            setShowingOtherDonationSum(true)
        } else {
            setShowingOtherDonationSum(false)
            setDonationSum(event.target.value)
        }
    }

    const twoWeeksAhead = new Date()
    twoWeeksAhead.setDate(twoWeeksAhead.getDate() + 14)
    const [paymentDate, setPaymentDate, isPaymentDateValid] = useFormField(twoWeeksAhead, value => new Date() < value)

    type DonationVisibility = "visible" | "pseudonym" | "anonymous"
    const [
        donationVisibility,
        setDonationVisibility,
        isDonationVisibilityValid
    ] = useFormField<DonationVisibility | "">(
        "",
        value => value !== ""
    )
    const [showingPseudonymField, setShowingPseudonymField] = useState(false)
    const onVisibilityChanged = (newDonationVisibility: DonationVisibility) => {
        setShowingPseudonymField(newDonationVisibility === "pseudonym")
        setDonationVisibility(newDonationVisibility)
    }
    const [pseudonym, setPseudonym, isPseudonymValid] = useFormField("", value => value !== "")
    const [groupName, setGroupName] = useState("")
    const [greeting, setGreeting] = useState("")

    const [flash, setFlash] = useState("")
    const [showAllInvalid, setShowAllInvalid] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const onSubmit = (event: React.MouseEvent) => {
        event.preventDefault()
        if (!isValid()) {
            setShowAllInvalid(true)
            setFlash("Var vänlig och dubbelkolla att alla fält har fyllts i korrekt.")
            window.location.href = "#top"
            return
        }
        console.log("Form is valid, submitting...")
        setIsSubmitting(true)
        setShowAllInvalid(true)
        // TODO: Submit here
        console.log("Form data that would be submitted", formData())
    }

    const isValid = () =>
        isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isAddressValid &&
        isZipcodeValid &&
        isCityValid &&
        isCountryValid &&
        isDonationSumValid &&
        isDonationVisibilityValid &&
        (donationVisibility === "pseudonym" ? isPseudonymValid : true)

    const formData = () => ({
        donationType,
        firstName,
        lastName,
        email,
        address,
        zipCode,
        city,
        country,
        donationSum,
        donationVisibility,
        pseudonym,
        groupName,
        greeting
    })


    return (
        <div id="top" className={styles.container}>
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
            { flash !== "" &&
                <p id="flash" className={styles.flash}>
                    {flash}
                </p>
            }
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
                        <InputGroup value={firstName} isValid={isFirstNameValid} showAllInvalid={showAllInvalid}>
                            <label htmlFor="first-name">Förnamn</label>
                            <input
                                type="text"
                                name="first-name"
                                placeholder="Svakar"
                                value={firstName}
                                onChange={event => setFirstName(event.target.value)}
                            />
                        </InputGroup>
                        <InputGroup value={lastName} isValid={isLastNameValid} showAllInvalid={showAllInvalid}>
                            <label htmlFor="last-name">Efternamn</label>
                            <input
                                type="text"
                                name="last-name"
                                placeholder="Teknolog"
                                value={lastName}
                                onChange={event => setLastName(event.target.value)}
                            />
                        </InputGroup>
                        <InputGroup value={email} isValid={isEmailValid} showAllInvalid={showAllInvalid}>
                            <label htmlFor="email">E-post</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="svakar@teknolog.fi"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </InputGroup>
                        <InputGroup value={address} isValid={isAddressValid} showAllInvalid={showAllInvalid}>
                            <label htmlFor="address">Adress</label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Otsvängen 22"
                                value={address}
                                onChange={event => setAddress(event.target.value)}
                            />
                        </InputGroup>
                        <InputGroup value={zipCode} isValid={isZipcodeValid} showAllInvalid={showAllInvalid}>
                            <label htmlFor="zip-code">Postnummer</label>
                            <input
                                type="text"
                                name="zip-code"
                                placeholder="02150"
                                value={zipCode}
                                onChange={event => setZipcode(event.target.value)}
                            />
                        </InputGroup>
                        <InputGroup value={city} isValid={isCityValid} showAllInvalid={showAllInvalid}>
                            <label htmlFor="city">Ort</label>
                            <input
                                type="text"
                                name="city"
                                placeholder="Esbo"
                                value={city}
                                onChange={event => setCity(event.target.value)}
                            />
                        </InputGroup>
                        <InputGroup value={country} isValid={isCountryValid} showAllInvalid={showAllInvalid}>
                            <label htmlFor="country">Land</label>
                            <input
                                type="text"
                                name="country"
                                placeholder="Finland"
                                value={country}
                                onChange={event => setCountry(event.target.value)}
                            />
                        </InputGroup>
                    </fieldset>
                    <fieldset>
                        <h2>Donation</h2>
                        <InputGroup
                            className={styles.donationSum}
                            isValid={isDonationSumValid}
                            value={donationSum}
                            showAllInvalid={showAllInvalid}
                        >
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
                        </InputGroup>
                        { showingOtherDonationSum &&
                            <InputGroup isValid={isDonationSumValid} value={donationSum} showAllInvalid={showAllInvalid}>
                                <label htmlFor="other-sum">Övrig summa (i euro, utan mellanslag och €-tecken)</label>
                                <input
                                    type="text"
                                    name="donation-sum"
                                    value={donationSum}
                                    onChange={event => setDonationSum(event.target.value)}
                                    placeholder="500"
                                    autoFocus
                                />
                            </InputGroup>
                        }
                        <InputGroup isValid={isPaymentDateValid} value={paymentDate} showAllInvalid={showAllInvalid}>
                            { /* TODO: Default 14 days after today */ }
                            <label htmlFor="date">Förfallodatum</label>
                            <span>Utgångsmässigt är förfallodatumet för donationen två veckor, men ifall du vill kan du även specificera ett senare datum.</span>
                            <DayPickerInput
                                dayPickerProps={{
                                    disabledDays: (date) => date < new Date(),
                                    firstDayOfWeek: 1,
                                    localeUtils: MomentLocaleUtils,
                                    locale: "se"
                                }}
                                value={paymentDate}
                                onDayChange={day => setPaymentDate(day)}
                            />
                        </InputGroup>
                        <InputGroup
                            className={styles.visibility}
                            isValid={isDonationVisibilityValid}
                            value={donationVisibility}
                            showAllInvalid={showAllInvalid}
                        >
                            { /* TODO: Pluralis för organisationer */ }
                            <label htmlFor="visibility">Synlighet</label>
                            <span>Samtycker du till att ditt namn som donator kommer vara synlig på denna hemsida och i det nya nationshuset?</span>
                            <input
                                type="radio"
                                id="visible"
                                name="visibility"
                                value="visible"
                                onClick={() => onVisibilityChanged("visible")}
                            />
                            <label htmlFor="visible">Jag samtycker och donerar under eget namn</label>
                            <input
                                type="radio"
                                id="pseudonym"
                                name="visibility"
                                value="pseudonym"
                                onClick={() => onVisibilityChanged("pseudonym")}
                            />
                            <label htmlFor="pseudonym">
                                Jag samtycker och donerar under följande pseudonym
                                { showingPseudonymField &&
                                    <input
                                        type="text"
                                        className={classNames({
                                            [styles.invalid]: !isPseudonymValid,
                                        }, styles.pseudonym)}
                                        placeholder="Svatta Teknolog"
                                        autoFocus={true}
                                        value={pseudonym}
                                        onChange={event => setPseudonym(event.target.value)}
                                    />
                                }
                            </label>
                            <input
                                type="radio"
                                id="anonymous"
                                name="visibility"
                                value="anonymous"
                                onClick={() => onVisibilityChanged("anonymous")}
                            />
                            <label htmlFor="anonymous">Jag donerar anonymt</label>
                        </InputGroup>
                    </fieldset>
                    { donationType === "individual" &&
                        <fieldset>
                            <h2>Grupp</h2>
                            <p>
                                <span>Ifall du donerar som grupp tillsammans med andra personer, fyll i gruppens namn.</span>
                                <label htmlFor="group-name">Gruppnamn (valfritt)</label>
                                <input
                                    type="text"
                                    name="group-name"
                                    value={groupName}
                                    onChange={event => setGroupName(event.target.value)}
                                />
                            </p>
                        </fieldset>
                    }
                    <fieldset>
                        <h2>Hälsning till Teknologföreningen</h2>
                        <p>
                            <span>Ifall du vill kan du skriva en hälsning till Teknologföreningen. Du kan till exempel berätta varför du donerade, dela med dig av visdomsord till framtidens phuxar eller berätta vad Teknologföreningen betyder för dig. (Valfritt)</span>
                            <textarea
                                name="greeting"
                                rows={5}
                                onChange={event => setGreeting(event.target.value)}
                                value={greeting}
                            >
                            </textarea>
                        </p>
                    </fieldset>
                    <button
                        className={styles.submit}
                        type="submit"
                        onClick={onSubmit}
                        disabled={isSubmitting}
                    >
                        { isSubmitting ? "Skapar gåvobrev..." : "Skapa gåvobrev" }
                    </button>
                    <p>När du klickar på <i>Skapa gåvobrev</i> genereras ett gåvobrev. Bekräftelse och underskrift sker i nästa steg.</p>
                </form>
            }
        </div>
    )
}

const InputGroup: React.FC<{
    children: React.ReactNode,
    className?: string
    isValid: boolean;
    showAllInvalid: boolean;
    value: any;
 }> = ({ className, children, isValid, showAllInvalid, value }) => {
     const [hasBeenTouched, setHasBeenTouched] = useState(false)
     useEffect(() => {
        if (value !== "") {
            setHasBeenTouched(true)
        }
     }, [value, setHasBeenTouched])
     return (
        <p
            className={classNames({
                [styles.invalid]: (showAllInvalid && !isValid) || (hasBeenTouched && !isValid),
                [className!]: className
            })}
        >
            {children}
        </p>
     )
  }

const useFormField = <T,>(
    defaultValue: T,
    validation: (fieldValue: T) => boolean
): [T, React.Dispatch<React.SetStateAction<T>>, boolean] => {
    const [value, setValue] = useState(defaultValue)
    const [isValid, setIsValid] = useState(validation(value))

    useEffect(() => {
        setIsValid(validation(value))
    }, [value, setIsValid])

    return [value, setValue, isValid]
}

export default DonationForm

export interface DonationFormProps {
    childContentfulDonationFormIntroductionTextTextNode: MarkdownRemarkTextNode
}