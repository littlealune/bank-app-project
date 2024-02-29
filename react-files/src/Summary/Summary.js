import './Summary.css'

function Summary({ movements , interestRate}) {
  // const { movements } = props

  const ingresos = movements
    .filter((mov) => mov.amount > 0)
    .reduce((acc, mov) => acc + mov.amount, 0)
    .toFixed(2) //sumIn
  const gastos = movements
    .filter((mov) => mov.amount < 0)
    .reduce((acc, mov) => acc + mov.amount, 0)
    .toFixed(2) // sumOut
  return (
    <div className="summary">
      <p className="summary__label">In</p>
      <p className="summary__value summary__value--in">{ingresos}€</p>
      <p className="summary__label">Out</p>
      <p className="summary__value summary__value--out">{Math.abs(gastos)}€</p>
      <p className="summary__label">Interest</p>
      <p className="summary__value summary__value--interest">{interestRate}</p>
      <button className="btn--sort">↓ SORT</button>
    </div>
  )
}

export default Summary
