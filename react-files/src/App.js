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
import Deposit from './Deposit/Deposit'
import Withdrawal from './Withdrawal/Withdrawal'
const ACCOUNTS_URL = 'http://localhost:4000'

function App() {
  const [account, setAccount] = useState({})
  const [token, setToken] = useState('')
  const { movements, owner: user = '', interestRate, numberAccount, address, country, nationalIdNumber, pin, username } = account

  useEffect(() => {
    // Función para obtener los datos del usuario
    const fetchUserData = () => {
      if (!token) return // No hay token, no se puede obtener datos
      fetch('http://localhost:4000/user?token=' + token)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          setAccount(data.account)
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error)
        })
    }
    // Obtener los datos del usuario inicialmente
    fetchUserData()
    // Configurar una función para obtener los datos cuando se detecta una transferencia
    const handleChange = () => {
      fetchUserData()
    }
    // Agregar un event listener para manejar las transferencias
    document.addEventListener('transfer', handleChange)
    document.addEventListener('withdrawal',handleChange)
    document.addEventListener('deposit',handleChange)
    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener('transfer', handleChange)
      document.removeEventListener('withdrawal', handleChange)
      document.removeEventListener('deposit', handleChange)
    }
  }, [token]) // Se ejecuta solo cuando cambia el token


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
      document.getElementById('LoginForm').reset()
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
          <Movements movements={movements}/>
          <Summary movements={movements} interestRate={interestRate} />
          <br />
          <br />
          <br />
          <br />


          

          <Deposit token={token} />
          <Transfer token={token}/>
          <Withdrawal token={token}/>

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
