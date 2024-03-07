import './Transfer.css'
import { useState } from 'react'

function Transfer({ token }) {

    const [to, setTo] = useState('')
    const [amount, setAmount] = useState('')

    const handleToChange = (event) => {
        setTo(event.target.value)
    }
    const handleAmountChange = (event) => {
        setAmount(event.target.value)
    }

    const handleTransfer = (event) => {
        event.preventDefault() // Prevents the form from submitting and refreshing the page
        const url = `http://localhost:4000/transfer?token=${token}`
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                destinationAccount: to,
                amount: Number(amount),
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
                // Emitir un evento personalizado de transferencia completada
                const transferEvent = new CustomEvent('transfer', {
                    detail: { type: 'transfer' },
                })
                document.dispatchEvent(transferEvent)
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error)
            })
    }


    return (
        <div className="operation operation--transfer">
            <h2>Transfer money</h2>
            <form className="form form--transfer" method="post" onSubmit={handleTransfer}>
                <input 
                    type="text" 
                    className="form__input form__input--to" 
                    onChange={handleToChange}
                />
                <input
                    type="number"
                    className="form__input form__input--amount"
                    onChange={handleAmountChange}
                />
                <button className="form__btn form__btn--transfer" type='submit'>&rarr;</button>
                <label className="form__label">Transfer to</label>
                <label className="form__label">Amount</label>
            </form>
        </div>
    )

}

export default Transfer;