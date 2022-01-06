import React, { useEffect, useMemo, useState } from "react"
import { DonateProps, Donation } from "./donate"
import DonationSummary from "./donationsummary"
import GroupAssociator from "./groupassociator"
import styles from "./confirmation.module.css"

const Confirmation: React.FC<{
  donation: Donation | null
  labels: DonateProps
  transactionSlug: string
}> = ({ donation, labels, transactionSlug }) => {
  const totalSumTarget = 3000000
  const totalSum = useCounter(3000000, 2000, 0)
  const concreteAmountTarget = 5.56
  const concreteAmount = useCounter(concreteAmountTarget, 2000, 2000)
  const danceFloorTarget = 2077
  const danceFloor = useCounter(danceFloorTarget, 2000, 4000)
  const percentageOfTotalTarget = 0.1538
  const percentageOfTotal = useCounter(percentageOfTotalTarget, 2000, 6000)

  return (
    donation === null ? (
      <p>Hämtar donationsuppgifter...</p>
    ) : (
      <div className={styles.confirmation}>
        <h2>{labels.bekraftelseTack}</h2>
        <p>{labels.bekraftelseTackUtforlig}</p>
        <p>
          Du har nu bidragit till en total pott på <span>{Math.round(totalSum).toString().padStart(totalSumTarget.toString().length, "0")} €</span> för den pågående kampanjen.
          Vi rör oss ständigt mot målet på 4,0 M€.
          Ditt stöd motsvarar cirka <span>{(Math.round(concreteAmount * 100) / 100).toString().padEnd(concreteAmountTarget.toString().length + 1, "0")} m³</span> betong,{" "}
          <span>{Math.round(danceFloor).toString().padStart(danceFloorTarget.toString().length, "0")} cm²</span> dansgolv eller{" "}
          <span>{(Math.round(percentageOfTotal * 1000) / 1000).toString().padEnd(percentageOfTotalTarget.toString().length, "0")} %</span> av TF:s nya nationshus.
          En bit i taget bygger vi Teknologföreningens framtid tillsammans!
        </p>
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
}

const useCounter = (target: number, durationMillis: number, delayMillis: number) => {
  const [current, setCurrent] = useState<number>(0)
  let start = 0
  let startTime = 0
  let timer: number | null = 0

  useEffect(() => {
    start = current
    startTime = Date.now() + delayMillis

    const incrementer = () => {
      const currentTime = Date.now()
      if ((currentTime - startTime) >= durationMillis) {
        setCurrent(target)
        if (timer != null) {
          window.clearInterval(timer)
          timer = null
        }
      } else if (currentTime > startTime) {
        const deltaY = target - start
        const px = (currentTime - startTime) / durationMillis
        setCurrent(start + px * deltaY)
      }
    }

    timer = window.setInterval(incrementer, 1000 / 10)

    return () => {
      if (timer != null) {
        window.clearInterval(timer)
      }
    }
  }, [target])

  return current
}

export default Confirmation
