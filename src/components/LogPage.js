import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'

import Logs from './Logs'



const LogPage = ({logs, onDelete}) => {

  
  return (
    <div>
      <h1>Logs</h1>
      <Logs logs = {logs} onDelete = {onDelete}/>
      <Link to = '/'>Go back</Link>
    </div>
  )
}

export default LogPage