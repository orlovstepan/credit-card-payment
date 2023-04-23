import { useState } from "react"
import styles from "./CreditCardForm.module.css"

const initialState = {
  cardNumber: {
    value: '',
    isError: false,
  },
  name: {
    value: '',
    isError: false,
  },
  expiryDate: {
    value: "",
    isError: false
  },
  CVC: {
    value: '',
    isError: false,
  },

}

export default function CreditCardForm() {

  const [details, setDetails] = useState<typeof initialState>(initialState);

  const validateCardNumber = (str: string) => {
    return str.replace(/\D/, '')
  }
  const validateName = (str: string) => {
    return str.replace(/[0-9]/, '')
  }

  const handleChange = (e: any) => {
    const field = e.target.id as keyof typeof initialState
    let value = e.target.value
    if (field === 'cardNumber') {
      value = validateCardNumber(value)
    }
    if (field === 'name') {
      value = validateName(value).toUpperCase()
    }
    if (field === "CVC") {
      value = validateCardNumber(value);
    }
    setDetails({
      ...details,
      [field]: { ...details[field], value }
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
  }

  return (
    <div className={styles["form-container"]}>
      <section className={styles["top-section"]}> 
        <img className={styles["form-image"]} src="/src/assets/payment.png" />
        <h2> Payment Info </h2>
      </section>
      <form className={styles['form']} onChange={handleChange}>
        <div className= {styles["name"]}>
          <label htmlFor="name" > Full Name </label>
          <input type='text' placeholder="Alex Smith" id="name" value={details.name.value} />
        </div>
        <div className={styles["card-number"]}>
          <label htmlFor="cardNumber"> Card Number </label>
          <input type="text" id="cardNumber" placeholder="1234 1234 1234 1234" maxLength={16} value={details.cardNumber.value} />
        </div>
        <div className={styles["date-cvc"]}>
          <div className={styles["date"]}>
            <label> Valid till </label>
            <input placeholder="MM/YY"></input>
          </div>
          <div className={styles["cvc"]}>
            <label htmlFor="CVC"> CVC </label>
            <input type="text" id="CVC" maxLength={3} placeholder="***" value={details.CVC.value} />
          </div>
        </div>
        <button onClick={handleSubmit} className={styles['submit-button']}>Submit</button>
      </form>
    </div>
  )
}