import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styles from "./groupassociator.module.css"
import classNames from "classnames"
import { motion } from "framer-motion"

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
  const groups = [{
      name: "Phux 30",
      members: ["Karl Petter", "Hanna Svensson", "Alice Malmgård"],
      isMember: false,
      onMembershipToggle: () => {}
    }, {
      name: "Magnus Ugglas Fanboys",
      members: ["Matti Bengtsson", "Ulla Lööf", "Mumin Dagmar"],
      isMember: true,
      onMembershipToggle: () => {}
    }, {
      name: "Noël",
      members: ["Pierre Omelette", "François Macaroni", "Bel Niçois"],
      isMember: false,
      onMembershipToggle: () => {}
    }, {
      name: "TFS42",
      members: ["Bert von Gammal", "Phis Torstensson", "Henrietta Marionetta"],
      isMember: false,
      onMembershipToggle: () => {}
    }, {
      name: "Banana Phone",
      members: ["Corncuopia Dopia", "Santa Maria", "Pirkka Chiquita"],
      isMember: false,
      onMembershipToggle: () => {}
    }

  ]

  const [allGroupsShown, setAllGroupsShown] = useState(false)
  const shownGroups = allGroupsShown ? groups : groups.slice(0, 3)

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
          <Group groupIcons={groupIcons} {...group} />
          {index != groups.length - 1 && <hr />}
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

const Group: React.FC<{
  name: string
  members: string[]
  isMember: boolean
  onMembershipToggle: () => void
  groupIcons: {
    join: File
    leave: File
  }
}> = ({ name, members, isMember, onMembershipToggle, groupIcons }) => {
  const icon = isMember ? groupIcons.leave : groupIcons.join
  return (
    <div className={styles.group}>
      <div>
        <h3>{isMember ? (<strong>{name}</strong>) : name}</h3>
        <p>{members.join(", ")}</p>
      </div>
      <motion.button
        className={classNames({ [styles.secondary]: isMember })}
        whileHover={{ scale: 0.9 }}
      >
        <img src={icon.publicURL} alt={isMember ? "Lämna gruppen" : "Gå med i gruppen"} />
      </motion.button>
    </div>
  )
}

interface File {
  publicURL: string
}

export default GroupAssociator
