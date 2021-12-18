import classNames from "classnames"
import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import styles from "./donationlevel.module.css"

const DonationLevel: React.FC<{
  sum: number,
  onLevelChange: (sum: number) => void
}> = ({ sum, onLevelChange }) => {
  const description = textForSum(sum)

  return (
    <motion.div className={styles.donationlevel} layout>
      <div className={styles.levels}>
        <motion.button
          className={classNames({ [styles.active]: sum >= 10 })}
          whileHover={{ scale: 1.1 }}
          onClick={() => onLevelChange(10)}
        >
          10
        </motion.button>
        <span className={classNames({ [styles.active]: sum > 10 })}></span>
        <motion.button
          className={classNames({ [styles.active]: sum >= 1000 })}
          whileHover={{ scale: 1.1 }}
          onClick={() => onLevelChange(1000)}
        >
          1k
        </motion.button>
        <span className={classNames({ [styles.active]: sum > 1000 })}></span>
        <motion.button
          className={classNames({ [styles.active]: sum >= 5000 })}
          whileHover={{ scale: 1.1 }}
          onClick={() => onLevelChange(5000)}
        >
          5k
        </motion.button>
        <span className={classNames({ [styles.active]: sum > 5000 })}></span>
        <motion.button
          className={classNames({ [styles.active]: sum >= 10000 })}
          whileHover={{ scale: 1.1 }}
          onClick={() => onLevelChange(10000)}
        >
          10k
        </motion.button>
      </div>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        <motion.p
          key={description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {textForSum(sum)}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  )
}

const textForSum = (sum: number) =>
  sum >= 10000 ? "Du får en inbjudan till ett särskilt donatorsällskap, med exklusiva evenemang och kontakt till nationen." :
  sum >= 5000 ? "Du får ett listigt tack i det nya huset ges donatorn och en garanterad plats på festligheterna kopplat till avslutningstillfället." :
  sum >= 1000 ? "Du får en personlig plakett på donatorväggen i det nya huset. Plakettens storlek skalas i förhållande till donationen. De snabbaste får inbjudan till festligheterna i samband med projektets avslutningstillfälle." :
  sum >= 10 ? "Du uppmärksammas på en plats i nya nationshuset och tillges Teknologföreningens donationsmärke med en okänd funktion i det nya huset. Dessutom följer en inbjudan till kampanjens avslutningstillfälle." :
  "Donera minst 10 € för att nå den första donationsnivån"

export default DonationLevel
