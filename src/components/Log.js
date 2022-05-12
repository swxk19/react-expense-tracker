import {FaTimes} from 'react-icons/fa'

const Log = ({log, onDelete}) => {

  return (
    <div className = "small-container">
    <span>{log.time}</span>
    <span> {log.ower} owes {log.payer} </span>
    <span>$ {parseFloat(log.amount).toFixed(2)}  <FaTimes style = 
        {{color : 'red',
        cursor : 'pointer',
        }} 
        onClick = {() => onDelete(log)}
        /> </span>
    
    </div>
  )
}

export default Log
