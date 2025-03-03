import './Movements.css'
import Movement from './Movement'

function Movements({ movements }) {
  //{movements: [10, 100, -30]}
  return (
    <div className="movements">
      {movements.map((movement, index) => (
        <Movement position={index} amount={movement.amount} date={(movement.date).split('T')[0]}/>
      ))}
    </div>
  )
}

export default Movements
