import { useState, useRef } from "react"
import styles from "./CreditCardForm.module.css"
import SuccessModal from "./SuccessModal";

type InputRefsType = {
  name: HTMLInputElement | null;
  cardNumber: HTMLInputElement | null;
  expiryDate: HTMLInputElement | null;
  CVC: HTMLInputElement | null;
};

type DetailField = 'name' | 'cardNumber' | 'expiryDate' | 'CVC';

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
  const [flag, setFlag] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const inputRefs = useRef<InputRefsType>({
    name: null,
    cardNumber: null,
    expiryDate: null,
    CVC: null,
  });

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

  const updateDetailsError = (field: DetailField, isError: boolean) => {
    setDetails({ ...details, [field]: { ...details[field], isError } });
    inputRefs.current[field]?.focus();
  };

  const formValidate = () => {
    
    const name = details.name.value.split(' ');
    const cardNumber = details.cardNumber.value.split(' ').join('');
    const expiryDate = details.expiryDate.value.split('/');
    console.log(Number(expiryDate[0])>12);
    console.log(Number(expiryDate[1])<22);
    
    if(!details.name.value || !details.cardNumber.value || !details.CVC.value || !details.expiryDate.value){
      setFlag(true);
      return;
    } 

    if (name.length !== 2 || name[0].length < 2 || name[1].length < 2){
      updateDetailsError('name', true);
    } else if (cardNumber.length !== 16){
      updateDetailsError('cardNumber', true);
    } else if (details.expiryDate.value.length !==5 || Number(expiryDate[0])>12 || Number(expiryDate[1])<23){
      updateDetailsError('expiryDate', true);
    } else if (details.CVC.value.length !==3){
      updateDetailsError('CVC', true);
    } else {
      setSuccess(true);
    }

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

  const handleCloseModal = () => {
    setSuccess(false);
    setDetails(initialState);
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
          <input ref={(el) => (inputRefs.current.name = el)} type='text' placeholder="ALEX SMITH" id="name" value={details.name.value} />
          {details.name.isError &&  <p className={styles["error"]}>Please check your name</p>}
        </div>
        <div className={styles["card-number"]}>
          <label htmlFor="cardNumber"> Card Number </label>
          <input ref={(el) => (inputRefs.current.cardNumber = el)} type="text" id="cardNumber" placeholder="1234 1234 1234 1234" maxLength={19} value={details.cardNumber.value} />
          {details.cardNumber.isError &&  <p className={styles["error"]}>Please check your card number</p>}
        </div>
        <div className={styles["date-cvc"]}>
          <div className={styles["date"]}>
            <label htmlFor="expiryDate"> Valid till </label>
            <input ref={(el) => (inputRefs.current.expiryDate = el)} maxLength={5} id="expiryDate" placeholder="MM/YY" value={details.expiryDate.value}></input>
            {details.expiryDate.isError &&  <p className={styles["error"]}>Please check your expiry date</p>}
          </div>
          <div className={styles["cvc"]}>
            <label htmlFor="CVC"> CVC </label>
            <input ref={(el) => (inputRefs.current.CVC = el)} type="password" id="CVC" maxLength={3} placeholder="***" value={details.CVC.value} />
            {details.CVC.isError &&  <p className={styles["error"]}>Please check your CVC</p>}
          </div>
        </div>
        {flag && <p className={styles["error"]}> Please fill out all the fields </p>}
        <button onClick={handleSubmit} className={styles['submit-button']}>Submit</button>
      </form>
      {success && <SuccessModal handleCloseModal={handleCloseModal} />}
    </div>
  )
}