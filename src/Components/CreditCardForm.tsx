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
    isError: false,
  },
  CVC: {
    value: '',
    isError: false,
  },
}

export default function CreditCardForm() {

  const [details, setDetails] = useState<typeof initialState>(initialState);
  const [flag, setFlag] = useState(false);

  const validateCardNumber = (str: string) => {
    const cardNumber = str.replace(/\D/g, '');
    const formattedCardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formattedCardNumber;
  }
  const validateName = (str: string) => {
    return str.replace(/[0-9]/, '')
  }

  const validateExpiry = (str: string) => {
    const date = str.replace(/\D/, '');
    const formattedDate = date.replace(/(\d{2})(?=\d)/g, "$1/")
    return formattedDate
  }

  const formValidate = () => {
    // FINISH HERE
    const name = details.name.value.split(' ');
    if (name.length !== 2){
      setDetails({...details, name: {...details.name, isError: true}})
      setFlag(true);
    }
    // IF ERROR, FOCUS THE FIELD WITH ERROR
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
    if (field === 'expiryDate'){
      value = validateExpiry(value)
    }
    setDetails({
      ...details,
      [field]: { ...details[field], value, isError: false }
    })
    setFlag(false);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    formValidate();
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
          <input type='text' placeholder="ALEX SMITH" id="name" value={details.name.value} />
          {details.name.isError &&  <p style={{color: 'red'}}>is error</p>}
        </div>
        <div className={styles["card-number"]}>
          <label htmlFor="cardNumber"> Card Number </label>
          <input type="text" id="cardNumber" placeholder="1234 1234 1234 1234" maxLength={19} value={details.cardNumber.value} />
        </div>
        <div className={styles["date-cvc"]}>
          <div className={styles["date"]}>
            <label htmlFor="expiryDate"> Valid till </label>
            <input maxLength={5} id="expiryDate" placeholder="MM/YY" value={details.expiryDate.value}></input>
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