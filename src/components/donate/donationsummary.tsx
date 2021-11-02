import { motion } from "framer-motion"
import React from "react"
import { Donation } from "./donate"
import styles from "./donationsummary.module.css"

const DonationSummary: React.FC<{
    donation: Donation
}> = ({ donation }) => (
  <motion.div className={styles.container}>
    <p>Namn: <span>{donation.name}</span></p>
    <p>
      Synlighet:{" "}
      <span>
      {donation.visibility === "pseudonym" ? (
        donation.pseudonym
      ) : (
        donation.visibility === "visible" ?
        "Synlig" : "Anonym"
      )}
      </span>
    </p>
    <p>E-post: <span>{donation.email}</span></p>
    <p>Summa: <span>{donation.sum}</span></p>
  </motion.div>
)

export default DonationSummary
