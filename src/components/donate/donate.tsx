import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import DonationForm from "./donationform"
import PaymentMethod from "./paymentmethod"

const Donate: React.FC = () => {
  const [donation, setDonation] = useState<Donation | null>(null)

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      {(donation == null) ? (
        <motion.div
          key="donation-form"
          initial="right"
          animate="center"
          exit="left"
          variants={transitionVariants}
          transition={{ ease: "easeInOut" }}
        >
          <DonationForm onFormFilled={(donation) => setDonation(donation)} />
        </motion.div>
      ) : (
        <motion.div
          key="payment-method"
          initial="left"
          animate="center"
          exit="right"
          variants={transitionVariants}
          transition={{ ease: "easeInOut" }}
        >
          <PaymentMethod />
        </motion.div>
      )}
    </AnimatePresence>  
  )
}

const transitionVariants = {
  left: { x: -200, opacity: 0 },
  center: {x: 0, opacity: 1},
  right: {x: 200, opacity: 0}
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
