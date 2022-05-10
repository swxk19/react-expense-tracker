import Log from './Log'

const Logs = ({logs, onDelete}) => {
  return (
    <>
    {
        logs.map((log) => (
        <Log key = {log.id} 
        log = {log} onDelete = {onDelete}/>)
        )
    }
    </>
  )
}

export default Logs