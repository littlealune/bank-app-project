import './Transfer.css'
import { useState } from 'react'

function Transfer({token}) {

    const [to, setTo] = useState('')
    const [amount, setAmount] = useState('')

    const handleTransfer = (event) => {
        event.preventDefault()
        setTo(document.getElementByClassName('form__input--to').value)
        setAmount(document.getElementByClassName('form__input--amount').value)
          fetch(`http://localhost:4000/movements?token=${token}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              destinationAccount: to,
              amount: Number(amount),
            }),
          })
         .then((response) => {
            if(!response.ok){

            }
         } )
        
      
      }


    return (
        <div className="operation operation--transfer">
            <h2>Transfer money</h2>
            <form className="form form--transfer" method="post" onSubmit={handleTransfer}>
              <input type="text" className="form__input form__input--to" />
              <input
                type="number"
                className="form__input form__input--amount"
              />
              <button className="form__btn form__btn--transfer" type='submit'>&rarr;</button>
              <label className="form__label">Transfer to</label>
              <label className="form__label">Amount</label>
            </form>
          </div>
    )

}

export default Transfer;