import React, { useEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styles from "./groupassociator.module.css"
import classNames from "classnames"
import { motion } from "framer-motion"
import axios from "axios"

const GroupAssociator: React.FC = () => {
  const groupIcons: {
    join: File,
    new: File,
    leave: File
  } = useStaticQuery(graphql`
    query {
      join: file(relativePath: { eq: "group-join.svg" }) {
        publicURL
      }
      leave: file(relativePath: { eq: "group-leave.svg" }) {
        publicURL
      }
      new: file(relativePath: { eq: "group-new.svg" }) {
        publicURL
      }
    }
  `)
  const groups = useAllGroups()

  const [allGroupsShown, setAllGroupsShown] = useState(false)
  const shownGroups = groups !== null ? (
    allGroupsShown ? groups : groups.slice(0, 3)
  ) : []

  // - Hover effect
  // - Alt description
  return (
    <div className={styles.groupassociator}>
      <div className={styles.group}>
        <input type="text" placeholder="Namn på ny grupp" />
        <button><img src={groupIcons.new.publicURL} /></button>
      </div>
      <hr />
      {shownGroups.map((group, index) => (
        <div key={group.name} className={styles.groupAndHr}>
          <Group groupIcons={groupIcons} description={group} onMembershipToggle={() => {}} />
          {index != shownGroups.length - 1 && <hr />}
        </div>
      ))}
      {!allGroupsShown &&
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault()
            setAllGroupsShown(true)
          }}
        >
          <small>Visa alla grupper</small>
        </a>
      }
    </div>
  )
}

const Group: React.FC<GroupProps> = ({ description, onMembershipToggle, groupIcons }) => {
  const icon = description.isMember ? groupIcons.leave : groupIcons.join
  return (
    <div className={styles.group}>
      <div>
        <h3>{description.isMember ? (<strong>{description.name}</strong>) : description.name}</h3>
        <p>{description.members.join(", ")}</p>
      </div>
      <motion.button
        className={classNames({ [styles.secondary]: description.isMember })}
        whileHover={{ scale: 0.9 }}
      >
        <img src={icon.publicURL} alt={description.isMember ? "Lämna gruppen" : "Gå med i gruppen"} />
      </motion.button>
    </div>
  )
}

interface GroupProps {
  description: GroupDescription
  onMembershipToggle: () => void
  groupIcons: {
    join: File
    leave: File
  }
}

interface GroupDescription {
  name: string
  members: string[]
  isMember: boolean
}

const useAllGroups = () => {
  const [allGroups, setAllGroups] = useState<GroupDescription[] | null>(null)

  useEffect(() => {
    const fetchAllGroups = async () => {
      const result = await axios.get(`${process.env.GATSBY_DONATIONDB_URL}/donations/groups`)
      setAllGroups(result.data)
    }
    fetchAllGroups()
  }, [])

  return allGroups
}

interface File {
  publicURL: string
}

export default GroupAssociator
