import React from "react"
import "moment/locale/sv"
import "react-day-picker/lib/style.css"
import styles from "./donationform.module.css"

const DonationForm: React.FC = () => {
  return (
    <iframe className={styles.container} src="http://localhost:8080/" />
  )
}

export default DonationForm
