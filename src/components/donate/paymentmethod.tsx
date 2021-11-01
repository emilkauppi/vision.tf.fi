import React, { useEffect, useState } from "react"
import styles from "./paymentmethod.module.css"

const PaymentMethod: React.FC = () => {
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
        <PaymentGroup
          key={group.id}
          name={group.name}
          providers={
            payment.providers.filter(provider => provider.group == group.id)
          }
        />
      ))}
      {payment && (
        <p><small dangerouslySetInnerHTML={{ __html: payment.terms}}></small></p>
      )}
    </div>
  )
}

const PaymentGroup: React.FC<{
  name: string
  providers: PaymentProvider[]
}> = ({ name, providers }) => (
  <div>
    <h2>{name}</h2>
    <div className={styles.grid}>
    {providers.map(provider => (
        <form
          className={styles.form}
          key={provider.name}
          action={provider.url}
          method="POST"
        >
          {provider.parameters.map(parameter =>
            <input
              type="hidden"
              name={parameter.name}
              value={parameter.value}
            />
          )}
          <button>
            <img src={provider.svg} />
          </button>
        </form>
      ))
    }
    </div>
  </div>
)

interface Payment {
  groups: PaymentGroup[]
  href: string
  providers: PaymentProvider[]
  reference: string
  terms: string
  transactionId: string
}

interface PaymentGroup {
    icon: string
    id: string
    name: string
    svg: string
}

interface PaymentProvider {
    group: string
    icon: string
    id: string
    name: string
    svg: string
    url: string
    parameters: {
      name: string
      value: string
    }[]
}

export default PaymentMethod
