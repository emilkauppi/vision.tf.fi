import React, { useEffect, useRef, useState } from "react"
import classNames from "classnames"
import styles from "./donationform.module.css"
import { AnimatePresence, motion } from "framer-motion"
import { Donation } from "./donate"

const DonationForm: React.FC<{
  onFormFilled: (donation: Donation) => void
}> = ({ onFormFilled }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [visibility, setVisibility] = useState<
    "visible"  | "pseudonym" | "anonymous"
  >("visible")
  const [pseudonym, setPseudonym] = useState("")
  const [sum, setSum] = useState<string | number>("")
  const [flash, setFlash] = useState("")

  const validateInput = () => (
    name != "" &&
    email != "" && (
      visibility == "pseudonym" ?
        pseudonym != "" :
        (visibility == "visible" || visibility == "anonymous")
    ) &&
    Number(sum) !== NaN
  )
  useEffect(() => {
    setFlash("")
  }, [name, email, visibility, pseudonym, sum])

  return (
    <div
      key="contact-details"
      className={styles.container}
    >
      <div className={styles.inputGroup}>
        <label htmlFor="donate-name">Namn</label>
        <input
          type="text"
          id="donate-name"
          placeholder="Svakar Teknolog"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoFocus={true}
        />
      </div>
      <div className={styles.inputGroup}>
          <label htmlFor="donate-email">E-post</label>
          <input
            type="text"
            id="donate-email"
            placeholder="svakar@teknolog.fi"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
      </div>
      <div
        className={classNames(
          styles.inputGroup,
          styles.visibility
        )}
      >
        <h2>Synlighet</h2>
        <p>
          Samtycker du till att ditt namn som donator kommer vara synlig på denna hemsida
          och i det nya nationshuset?
        </p>
        <div>
          <input
            type="radio"
            name="visibility"
            id="visibility-visible"
            onClick={() => setVisibility("visible")}
          />
          <label htmlFor="visibility-visible">
            Jag samtycker och donerar under eget namn
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="visibility"
            id="visibility-pseudonym"
            onClick={() => setVisibility("pseudonym")}
          />
          <label htmlFor="visibility-pseudonym">
            Jag samtycker och donerar under följande pseudonym
          </label>
          {visibility == "pseudonym" && (
            <input
              type="text"
              placeholder="Pseudonym"
              autoFocus={true}
              value={pseudonym}
              onChange={(event) => setPseudonym(event.target.value)}
            />
          )}
        </div>
        <div>
          <input
            type="radio"
            name="visibility"
            id="visibility-anonymous"
            onClick={() => setVisibility("anonymous")}
          />
          <label htmlFor="visibility-anonymous">
            Jag donerar anonymt
          </label>
        </div>
      </div>
      <div className={styles.inputGroup}>
          <label htmlFor="donate-sum">Summa</label>
          <input
            type="tel"
            id="donate-sum"
            placeholder="00.00"
            value={sum}
            onChange={(event) => setSum(event.target.value)}
          />
      </div>
      <AnimatePresence>
        {flash !== "" &&
          <motion.p
            className={styles.flash}
            key="flash"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0}
            }}
          >
            {flash}
          </motion.p>
        }
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => {
          if (validateInput()) {
            onFormFilled({
              name,
              email,
              visibility,
              pseudonym,
              sum: Number(sum)
            })
          } else {
            setFlash("Var vänlig och fyll i alla fält för att fortsätta")
          }
        }}
        layout
      >
        Visa betalningsalterativ
      </motion.button>
    </div>
  )
}

export default DonationForm
