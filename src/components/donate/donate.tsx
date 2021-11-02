import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import DonationForm from "./donationform"
import DonationSummary from "./donationsummary"
import PaymentMethod from "./paymentmethod"
import styles from "./donate.module.css"

const Donate: React.FC = () => {
  const [isEditingDonation, setIsEditingDonation] = useState(true)
  const [donation, setDonation] = useState<Donation | null>(null)

  return (
    <div className={styles.container}>
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
          {(donation == null || isEditingDonation) ? (
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
          )}
        </AnimatePresence>
      </motion.fieldset>
      {donation != null && !isEditingDonation &&
        <motion.div
          key="payment-method"
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          variants={transitionVariants}
          transition={{ ease: "easeInOut" }}
        >
          <PaymentMethod />
        </motion.div>
      }
    </div>
  )
}

const transitionVariants = {
  collapsed: { opacity: 0, height: 0 },
  expanded: { opacity: 1, height: "auto" }
}

export type CheckoutHeaders = Record<CheckoutHeaderNames, string>

export interface Donation {
  visibility: "visible" | "anonymous" | "pseudonym"
  pseudonym: string
  sum: number
  name: string
  email: string
}

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

export default Donate
