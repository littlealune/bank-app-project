import { useState } from 'react'
import './App.css'
import Welcome from './Welcome/Welcome'
import Login from './Login/Login'
import Summary from './Summary/Summary'
import Movements from './Movements/Movements'
import Balance from './Balance/Balance'
import LogOutTimer from './LogOutTimer/LogOutTimer'
import Info from './Info/Info'
const ACCOUNTS_URL = 'http://localhost:4000'

function App() {
  const [account, setAccount] = useState({})
  const [token, setToken] = useState('')
  const { movements, owner: user = '' , interestRate, numberAccount, address, country, nationalIdNumber} = account

  const handleLogin = async (user, pin) => {
    try {
      // aquí iría la llamada a servidor con usuario y pin
      const response = await fetch(ACCOUNTS_URL + '/login?username=' + user + "&pin=" + pin)
      if (!response.ok) {
        throw new Error("Login failed")
      }
      const data = await response.json()
      setAccount(data.account)
      setToken(data.token)
    } catch (error) {
      console.error("Error: " + error.message)
    }
  }

  return (
    <>
      <nav>
        <Welcome user={user} />
        <Login onLogin={handleLogin} />
      </nav>
      {user && (
        <main className="app">
         
         <Info user={user} numberAccount={numberAccount} address={address} country={country} nationalIdNumber={nationalIdNumber}/>
          <Balance movements={movements} />
          <Movements movements={movements} />
          <Summary movements={movements} interestRate={interestRate}/>
          <br/>
          <br/>
          <br/>
          <br/>


          <div className="operation operation--transfer">
            <h2>Transfer money</h2>
            <form className="form form--transfer" method="post" action={ACCOUNTS_URL + '/transfer?token=' + token}>
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

          <div className="operation operation--loan">
            <h2>Request loan</h2>
            <form className="form form--loan" method="post" action={ACCOUNTS_URL + '/movements?token=' + token}>
              <input
                type="number"
                className="form__input form__input--loan-amount"
              />
              <button className="form__btn form__btn--loan" type='submit'>&rarr;</button>
              <label className="form__label form__label--loan">Amount</label>
            </form>
          </div>

          <div className="operation operation--close">
            <h2>Close account</h2>
            <form className="form form--close">
              <input type="text" className="form__input form__input--user" />
              <input
                type="password"
                maxLength="6"
                className="form__input form__input--pin"
              />
              <button className="form__btn form__btn--close">&rarr;</button>
              <label className="form__label">Confirm user</label>
              <label className="form__label">Confirm PIN</label>
            </form>
          </div>

          <p className="logout-timer">
            You will be logged out in <LogOutTimer />
          </p>
        </main>
      )}
    </>
  )
}

export default App
