import React, { useMemo } from "react"
import PaymentMethod from "./paymentmethod"
import ValidatePayment from "./validatepayment"

const DonationForm: React.FC = () => {
  const queryParameters = useMemo(() =>
    new URLSearchParams(window.location.search)
  , [])

  const potentialPaymentStatus = queryParameters.get("betalning")
  return potentialPaymentStatus === "ok" ? (
    <ValidatePayment />
  ) : (
    <PaymentMethod />
  )
}

export default DonationForm
