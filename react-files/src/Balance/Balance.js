import './Balance.css'
function Balance(props) {
  const { movements } = props
  const balance = movements.reduce((acc, mov) => acc + mov.amount, 0)
  const today = new Date()

  const year = today.getFullYear()
  const month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)
  const day = today.getDate() > 9? today.getDate() : '0' + today.getDate()

  const date = `${day}/${month}/${year}`

  return (
    <div className="balance">
      <div>
        <p className="balance__label">Current balance</p>
        <p className="balance__date">
          As of <span className="date">{date}</span>
        </p>
      </div>
      <p className="balance__value">{balance}€</p>
    </div>
  )
}

export default Balance
