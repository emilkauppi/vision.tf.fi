import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useMemo, useState } from "react"
import useDebounced from "../../hooks/useDebounced"
import styles from "./addressform.module.css"

const AddressForm: React.FC = () => {
    const [street, setStreet] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")

    const address = useMemo<Address>(() => ({
        street, zipCode, city, country
    }), [street, zipCode, city, country])

    const saveState = useAutomaticSavingForAddressChanges(address)

    return (
        <form
            className={styles.addressForm}
            onSubmit={(event) => event.preventDefault()}
        >
            <div className={styles.inputGroup}>
                <label htmlFor="address-street">Gata</label>
                <input
                    type="text"
                    id="address-street"
                    placeholder="Otsvängen 22"
                    value={street}
                    onChange={(event) => setStreet(event.target.value)}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="address-zip-code">Postnummer</label>
                <input
                    type="text"
                    id="address-zip-code"
                    placeholder="02150"
                    value={zipCode}
                    onChange={(event) => setZipCode(event.target.value)}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="address-city">Ort</label>
                <input
                    type="text"
                    id="address-city"
                    placeholder="Esbo"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="address-country">Land</label>
                <input
                    type="text"
                    id="address-country"
                    placeholder="Finland"
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                />
            </div>
            <AnimatePresence exitBeforeEnter>
                <motion.p
                  key={saveState}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                    <small>
                        {saveState === SaveState.Initial ? (
                            "Fyll i alla fält"
                        ) : (
                            "Dina adressuppgifter har sparats!"
                        )}
                    </small>
                </motion.p>
            </AnimatePresence>
        </form>
    )
}

enum SaveState {
    Initial,
    Saved
}

const useAutomaticSavingForAddressChanges = (address: Address): SaveState => {
    const [state, setState] = useState<SaveState>(SaveState.Initial)

    const debouncedAddress = useDebounced(address, 2000)

    useEffect(() => {
        setState(SaveState.Initial)
    }, [address])

    useEffect(() => {
        if (!Object.values(debouncedAddress).reduce((allNonEmpty, current) => (allNonEmpty && current != ""), true)) {
            return
        }
        setState(SaveState.Saved)
    }, [debouncedAddress])

    return state
}

interface Address {
    street: string
    zipCode: string
    city: string
    country: string
}

export default AddressForm
