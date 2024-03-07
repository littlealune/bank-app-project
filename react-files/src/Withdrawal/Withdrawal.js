import './Withdrawal.css'
import { useState } from 'react'

function Withdrawal({token}) {

    const [amount, setAmount] = useState('')

    const handleAmountChange = (event) => {
        setAmount(event.target.value)
    }

    const handleWithdrawal = (event) => {
        event.preventDefault() // Prevents the form from submitting and refreshing the page
        const url = `http://localhost:4000/movements?token=${token}`
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                amount: -Number(amount),
                date: new Date().toISOString(),
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error)
            })
    }
        return(
            <div className="operation operation--withdrawal">
            <h2>Withdrawal</h2>
            <form className="form form--loan" method="post" onSubmit={handleWithdrawal}>
              <input
                type="number"
                className="form__input form__input--loan-amount"
                onChange={handleAmountChange}
              />
              <button className="form__btn form__btn--loan" type='submit'>&rarr;</button>
              <label className="form__label form__label--loan">Amount</label>
            </form>
          </div>
        )

}

export default Withdrawal