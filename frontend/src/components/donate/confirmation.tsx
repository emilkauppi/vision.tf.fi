import React from "react"
import { DonateProps, Donation } from "./donate"
import DonationSummary from "./donationsummary"
import GroupAssociator from "./groupassociator"

const Confirmation: React.FC<{
  donation: Donation | null
  labels: DonateProps
  transactionSlug: string
}> = ({ donation, labels, transactionSlug }) => (
  donation === null ? (
    <p>Hämtar donationsuppgifter...</p>
  ) : (
    <div>
      <h2>{labels.bekraftelseTack}</h2>
      <p>{labels.bekraftelseTackUtforlig}</p>
      <p>{labels.bekraftelseGruppdonation}</p>
      <fieldset>
        <legend><span>Gruppdonation (valfri)</span></legend>
        <GroupAssociator transactionSlug={transactionSlug} />
      </fieldset>
      <p>{labels.bekraftelseDonationsuppgifter}</p>
      <fieldset>
        <legend><span>Donationsuppgifter</span></legend>
        <DonationSummary donation={donation} labels={labels} />
      </fieldset>
    </div>
  )
)

export default Confirmation
