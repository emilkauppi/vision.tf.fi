import React from "react"
import { FormData } from "./formdata"
import styles from "./formsentinformation.module.css"

const FormSentInformation: React.FC<{
  formData: FormData | null
}> = ({ formData }) => {
  return (
    <div className={styles.container}>
        <h1>Tack för din donation!</h1>
        <p>
            Gåvobrevet har skickats till den angivna e-postadressen.
        </p>
        <p>
            Frågor? Kontakta Teknologföreningens fundraisingchef Emil Kauppi (<a href="mailto:funchef@tf.fi">funchef.tf.fi</a>)
        </p>
    </div>
  )
};

export default FormSentInformation
