import axios from "axios"
import React, { useEffect, useState } from "react"
import styles from "./donorlist.module.css"

const DonorList: React.FC<DonorListProps> = () => {
  const allDonations = useAllDonations()

  return (
    <div className={styles.container}>
      {allDonations && (
        <>
          <h2>Organisationer</h2>
          <Donors names={allDonations.organizations} />
          {allDonations.individuals.length == 0 && (
            <>
              <h2>Privatpersoner</h2>
              <Donors names={allDonations.individuals} />
            </>
          )}
        </>
      )}
    </div>
  )
}

const useAllDonations = () => {
  const [allDonations, setAllDonations] = useState<AllDonations | null>(null)

  const fetchAllDonations = async () => {
    const response = await axios.get(`${process.env.GATSBY_DONATIONDB_URL}/donations/all`)
    setAllDonations(response.data)
  }

  useEffect(() => {
    fetchAllDonations()
  }, [])

  return allDonations
}

const Donors: React.FC<{ names: string[] }> = ({ names: donors }) => (
  <ul>
    {donors.map((donor, index) => (
      <li key={`${index}-${donor}`}>{donor}</li>
    ))}
  </ul>
)

interface AllDonations {
  organizations: string[]
  individuals: string[]
}

export interface DonorListProps {
  sys: {
    contentType: {
      sys: {
        id: "donorList"
      }
    }
  }
}

export default DonorList
