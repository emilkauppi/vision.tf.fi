import axios from "axios"
import React, { useEffect, useState } from "react"
import styles from "./donorlist.module.css"

const DonorList: React.FC<DonorListProps> = () => {
  const allDonations = useAllDonations()

  return (
    <div className={styles.container}>
      <h2>Donatorer</h2>
      {allDonations && (
        <Donors names={allDonations.donors} />
      )}
    </div>
  )
}

const useAllDonations = () => {
  const [allDonations, setAllDonations] = useState<AllDonations | null>(null)

  const fetchAllDonations = async () => {
    try {
      const response = await axios.get(`${process.env.GATSBY_DONATIONDB_URL}/donations/all`)
      setAllDonations(response.data)
    } catch (exception) {
      console.warn("Unable to fetch donations", exception)
    }
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
  donors: string[]
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
