import classNames from "classnames"
import React, { useEffect, useRef, useState } from "react"
import SignaturePad from "react-signature-pad"
import PdfDocument from "./pdfdocument"
import styles from "./signdocument.module.css"

const SignDocument: React.FC<{
  file: Uint8Array
  name: string
  onEditRequested: () => void
  onSign: (signature: string) => void
}> = ({ file, name, onEditRequested, onSign }) => {
  const signaturePad = useRef<{
    _canvas: HTMLCanvasElement
    _ctx: CanvasRenderingContext2D
    clear: () => void
    isEmpty: () => boolean
    toDataURL: (contentType: string) => string
  }>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [drawingMode, setDrawingMode] = useState<Mode>(Mode.Generated)

  const setHasDrawn = () => {
    console.log("Has drawn")
    setDrawingMode(Mode.HasDrawn)
  }

  useEffect(() => {
    if (!signaturePad.current) {
      return
    }
    generateSignature()
    signaturePad.current._canvas.addEventListener("mouseup", setHasDrawn)
    return () => signaturePad.current?._canvas.removeEventListener("mouseup", setHasDrawn)
  }, [signaturePad])


  // Note that the font is by force preloaded in Layout.tsx: https://stackoverflow.com/questions/2756575/drawing-text-to-canvas-with-font-face-does-not-work-at-the-first-time
  const generateSignature = () => {
    const canvas = signaturePad.current?._canvas
    const context = signaturePad.current?._ctx
    if (canvas && context) {
      signaturePad.current?.clear()
      context.fillStyle = "#000"
      context.font = "normal 48px Alex Brush, cursive"
      context.fillText(name, 16, 52)
    }
  }

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
        <div>
          <button
            className={classNames(styles.marginRight, styles.reset)}
            onClick={() => {
              setDrawingMode(Mode.WillDraw)
              signaturePad.current?.clear()
            }}
          >
            {[Mode.Generated, Mode.WillDraw].includes(drawingMode) ? "Rita i rutan" : "Återställ"}
          </button>
          <button
            className={styles.reset}
            onClick={() => {
              setDrawingMode(Mode.Generated)
              generateSignature()
            }}
          >
            Generera
          </button>
        </div>
      </div>
      <SignaturePad ref={signaturePad} />
      <div className={styles.actions}>
        <button className={styles.edit} onClick={onEditRequested}>
          Ändra
        </button>
        <button
          className={styles.donate}
          onClick={() => {
            if (!signaturePad.current) {
              console.error("No reference to signature pad found")
              return
            }
            if (drawingMode == Mode.WillDraw) {
              generateSignature()
            } else {
              setIsSubmitting(true)
              onSign(signaturePad.current.toDataURL("image/svg+xml"))
            }
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

enum Mode {
  Generated,
  WillDraw,
  HasDrawn
}

export default SignDocument
