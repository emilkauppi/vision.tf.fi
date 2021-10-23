import React from "react"
import "moment/locale/sv"
import "react-day-picker/lib/style.css"
import styles from "./donationform.module.css"
import { graphql, useStaticQuery } from "gatsby"

const DonationForm: React.FC = () => {
 const paymentMethods: PaymentMethods = useStaticQuery(
    graphql`
      query PaymentMethodsQuery {
        allPaymentMethod {
          nodes {
            name
            svg
            id
          }
        }
      }`
  )

  return (
    <div className={styles.container}>
      <h2>Välj betalningssätt</h2>
      <div className={styles.grid}>
        {paymentMethods.allPaymentMethod.nodes.map(paymentMethod =>
          <a className={styles.button} href="#">
            <img
              src={paymentMethod.svg}
              alt={paymentMethod.name} />
          </a>
        )}
      </div>
    </div>
  )
}

interface PaymentMethods {
  allPaymentMethod: {
    nodes: {
      id: string
      name: string
      svg: string
    }[]
  }
}

export default DonationForm
