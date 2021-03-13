import React from "react"
import { FormData } from "./formdata"
import styles from "./formsentinformation.module.css"
import { saveAs } from "file-saver"
import PdfDocument from "./pdfdocument"

const FormSentInformation: React.FC<{
  formData: FormData | null,
  signedDocument: Uint8Array
}> = ({ formData, signedDocument }) => {
  const saveForm = () => {
    saveAs(
      new Blob(
        [signedDocument],
        { type: "application/pdf" }
      ),
      "gavobrev.pdf"
    )
  }
  return (
    <div className={styles.container}>
        <h1>Tack för ditt stöd!</h1>
        <p>
            Gåvobrevet har skickats till den angivna e-postadressen. Klicka <a href="#" onClick={saveForm}>här</a> för att ladda ner en kopia.
        </p>
        <p>
            Frågor? Kontakta Teknologföreningens fundraisingchef Emil Kauppi (<a href="mailto:funchef@tf.fi">funchef.tf.fi</a>)
        </p>
        <PdfDocument file={signedDocument} />
    </div>
  )
};

export default FormSentInformation
