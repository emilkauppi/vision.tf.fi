import React, { useEffect, useState } from "react"
import styles from "./donationform.module.css"
import _ from "lodash"

const DonationForm: React.FC = () => {
  const [payment, setPayment] = useState<Payment | null>(null)

  useEffect(() => {
    const updatePaymentProviders = async () => {
      const response = await fetch(`${process.env.GATSBY_DONATIONDB_URL}/payments/providers`)
      const paymentResponse = await response.json() as Payment
      setPayment(paymentResponse)
    }

    updatePaymentProviders().catch(console.error)
  }, [])

  return (
    <div className={styles.container}>
      {payment?.groups.map(group => (
        <div key={group.id}>
          <h2>{group.name}</h2>
          <div className={styles.grid}>
          {payment.providers
            .filter(provider => provider.group == group.id)
            .map(provider => (
              <a className={styles.button} key={provider.name} href="#">
                <img src={provider.svg} />
              </a>
            ))
          }
          </div>
        </div>
      ))}
      {payment && (
        <p><small dangerouslySetInnerHTML={{ __html: payment.terms}}></small></p>
      )}
    </div>
  )
}

interface Payment {
  groups: {
    icon: string
    id: string
    name: string
    svg: string
  }[],
  href: string,
  providers: {
    group: string,
    icon: string,
    id: string,
    name: string,
    svg: string,
    url: string
  }[],
  reference: string,
  terms: string,
  transactionId: string
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
