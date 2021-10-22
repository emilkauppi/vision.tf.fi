import React from "react"
import "moment/locale/sv"
import "react-day-picker/lib/style.css"
import styles from "./donationform.module.css"

const DonationForm: React.FC = () => {
  const paymentFormUrl = `${process.env.GATSBY_DONATIONDB_URL}/payments/form`
  return (
    <iframe className={styles.container} src={paymentFormUrl} />
  )
}

export default DonationForm
