import React, { useMemo } from "react"
import PaymentMethod from "./paymentmethod"
import ValidatePayment from "./validatepayment"

const DonationForm: React.FC = () => {
  const queryParameters = useMemo(() =>
    new URLSearchParams(window.location.search)
  , [])

  const potentialPaymentStatus = queryParameters.get("betalning")
  if (potentialPaymentStatus === "ok") {
    const checkoutHeaders = checkoutHeaderNames.reduce(
      (accumulator, headerName) => ({...accumulator, [headerName]: queryParameters.get(headerName)}),
      {}
    ) as CheckoutHeaders
    return <ValidatePayment checkoutHeaders={checkoutHeaders} />
  }
  return <PaymentMethod />
}

export type CheckoutHeaders = Record<CheckoutHeaderNames, string>

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

export default DonationForm
