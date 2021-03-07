import React, { useRef, useState } from "react"
import SignaturePad from "react-signature-pad"
import PdfDocument from "./pdfdocument"
import styles from "./signdocument.module.css"

const SignDocument: React.FC<{
  file: Uint8Array
  onEditRequested: () => void
  onSign: (signature: string) => void
}> = ({ file, onEditRequested, onSign }) => {
  const signaturePad = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <div className={styles.container}>
      <p>
        På basen av information du angav i det föregående steget har vi skapat
        ett gåvobrev. Var vänlig och säkerställ att informationen är korrekt
        ifylld och underteckna gåvobrevet nedan. Det undertecknade gåvobrevet
        kommer att skickas till den e-postadress som du har angivit.
      </p>
      <PdfDocument file={file} />
      <div className={styles.signatureHeader}>
        <span>Namnteckning</span>
        <button
          className={styles.reset}
          onClick={() => signaturePad.current?.clear()}
        >
          Återställ
        </button>
      </div>
      <SignaturePad ref={signaturePad} />
      <div className={styles.actions}>
        <button className={styles.edit} onClick={onEditRequested}>
          Ändra
        </button>
        <button
          className={styles.donate}
          onClick={() => {
            setIsSubmitting(true)
            onSign(signaturePad.current?.toDataURL("image/svg+xml"))
          }}
        >
          {isSubmitting ? "Skickar email" : "Donera"}
        </button>
      </div>
      <p>
        Det undertecknade gåvobrevet skickas till den angivna e-postadressen och
        en kopia skickas till Teknologföreningen.
      </p>
    </div>
  )
}

export default SignDocument
