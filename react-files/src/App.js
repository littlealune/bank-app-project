import { useState , useEffect} from 'react'
import './App.css'
import Welcome from './Welcome/Welcome'
import Login from './Login/Login'
import Summary from './Summary/Summary'
import Movements from './Movements/Movements'
import Balance from './Balance/Balance'
import LogOutTimer from './LogOutTimer/LogOutTimer'
import Info from './Info/Info'
import Transfer from './Transfer/Transfer'
const ACCOUNTS_URL = 'http://localhost:4000'

function App() {
  const [account, setAccount] = useState({})
  const [token, setToken] = useState('')
  const [movements, setMovements] = useState([])
  const { owner: user = '', interestRate, numberAccount, address, country, nationalIdNumber, pin, username } = account

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const response = await fetch(`${ACCOUNTS_URL}/user?token=${token}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movements');
        }
        const data = await response.json();
        setMovements(data.account.movements || []);
      } catch (error) {
        console.error('Error fetching movements:', error.message);
      }
    };

    fetchMovements();
  }, [token]);


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
  const handleLogout = () => {
    const userLogout = document.getElementById('user__logout').value ?? ''
    const pinLogout = document.getElementById('pin__logout').value ?? ''
    if (username === userLogout && pin === Number(pinLogout)) {
      window.location.reload()
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

          <Info user={user} numberAccount={numberAccount} address={address} country={country} nationalIdNumber={nationalIdNumber} />
          <Balance movements={movements} />
          <Movements movements={movements} />
          <Summary movements={movements} interestRate={interestRate} />
          <br />
          <br />
          <br />
          <br />


          <Transfer token={token} />

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
              <input type="text" className="form__input form__input--user" id="user__logout" />
              <input
                type="password"
                maxLength="6"
                className="form__input form__input--pin"
                id="pin__logout"
              />
              <button className="form__btn form__btn--close" type="button" onClick={handleLogout}>&rarr;</button>
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
