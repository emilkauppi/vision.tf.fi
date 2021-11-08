import { AnimatePresence, motion } from "framer-motion"
import React, { useContext, useEffect, useMemo, useState } from "react"
import DonationForm from "./donationform"
import DonationSummary from "./donationsummary"
import PaymentMethod from "./paymentmethod"
import styles from "./donate.module.css"
import { LocationContext } from "../../templates/page"
import axios from "axios"
import classNames from "classnames"

const Donate: React.FC = () => {
  const transactionId = useTransactionId()
  const [isLoadingDonation, donation, setDonation] = useDonation(transactionId)
  const [isEditingDonation, setIsEditingDonation] = useState(
    !isLoadingDonation
  )

  return (
    <div className={styles.container}>
      {transactionId != null && donation != null && (
        <fieldset className={classNames(styles.fieldset, styles.error)}>
          <p>Betalningen misslyckades. Var vänlig och dubbelkolla dina uppgifter, försök sedan på nytt.</p>
        </fieldset>
      )}
      <motion.fieldset className={styles.fieldset}>
        <legend>
          <span>Donationsuppgifter</span>
          <AnimatePresence>
            {!isEditingDonation &&
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsEditingDonation(true)}
                layout
              >
                Ändra
              </motion.button>
            }
          </AnimatePresence>
        </legend>
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {isLoadingDonation ? (
            <p>Hämtar...</p>
          ) : (
            (donation == null || isEditingDonation) ? (
              <motion.div
                key="donation-form"
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                variants={transitionVariants}
                transition={{ ease: "easeInOut" }}
              >
                <DonationForm
                  donation={donation}
                  onFormFilled={(donation) => {
                    setDonation(donation)
                    setIsEditingDonation(false)
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="donation-summary"
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                variants={transitionVariants}
                transition={{ ease: "easeInOut" }}
              >
                <DonationSummary
                  donation={donation}
                />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </motion.fieldset>
      {donation != null && !isEditingDonation &&
        <motion.fieldset
          className={styles.fieldset}
          key="payment-method"
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          variants={transitionVariants}
          transition={{ ease: "easeInOut" }}
        >
          <legend><span>Välj betalningsmetod</span></legend>
          <PaymentMethod donation={donation} />
        </motion.fieldset>
      }
    </div>
  )
}

const transitionVariants = {
  collapsed: { opacity: 0, height: 0 },
  expanded: { opacity: 1, height: "auto" }
}

export type CheckoutHeaders = Record<CheckoutHeaderNames, string>

interface Transaction {
  "checkout-transaction-id": string
  status: "new" | "ok" | "fail" | "pending" | "delayed"
  contribution: {
    visibility: VisibilityChoice,
    sum: string
    greeting: string
    group_name: string
    donor: {
      name: string
      pseudonym: string
      email: string
    }
  }
}

export interface Donation {
  visibility: VisibilityChoice
  pseudonym: string
  sum: number
  name: string
  email: string
}

export type VisibilityChoice = "visible" | "anonymous" | "pseudonym"

const checkoutHeaderNames = [
  "checkout-account",
  "checkout-algorithm",
  "checkout-amount",
  "checkout-stamp",
  "checkout-reference",
  "checkout-transaction-id",
  "checkout-status",
  "signature"
] as const
type CheckoutHeaderNames = typeof checkoutHeaderNames[number]

const useTransactionId = () => {
  const location = useContext(LocationContext)
  if (location == null) {
    return null
  }
  const potentialParameters = new URLSearchParams(location.search)
  return potentialParameters.get("checkout-transaction-id")
}

const useDonation = (transactionId: string | null): [
  boolean, Donation | null, React.Dispatch<React.SetStateAction<Donation | null>>
] => {
  const [isLoading, setIsLoading] = useState(
    transactionId !== null
  )
  const [donation, setDonation] = useState<Donation | null>(null)

  useEffect(() => {
    if (transactionId == null) {
      return
    }

    const fetchAndSetTransaction = async () => {
      const encodedTransactionId = encodeURI(transactionId)
      try {
        const transaction = (
          await axios.get<Transaction>(
            `${process.env.GATSBY_DONATIONDB_URL}/payments/transaction/${encodedTransactionId}`
          )
        ).data
        setDonation({
          email: transaction.contribution.donor.email,
          name: transaction.contribution.donor.name,
          pseudonym: transaction.contribution.donor.pseudonym,
          sum: Number(transaction.contribution.sum),
          visibility: transaction.contribution.visibility,
        })
        setIsLoading(false)
      } catch (error) {
        console.error("Unable to fetch transaction", error)
        setDonation(null)
        setIsLoading(false)
      }
    }

    fetchAndSetTransaction()
  }, [])

  return [isLoading, donation, setDonation]
}

export default Donate