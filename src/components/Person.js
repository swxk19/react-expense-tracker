import ExpandMoreIcon from '@material-ui/icons//ExpandMore'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import PersonalLogs from './PersonalLogs'

const Person = ({person}) => {

  const [showLogs, setShowLogs] = useState(false)

  return (
    <div className = 'person' style = {{padding: 10}}>
      <div style = {{justifyContent: "space-between", display: 'flex'}}>
        <div>
          <div>
            <h4>{person.name}</h4>
            <p>Paid for: ${(parseFloat(person.paidFor))}</p>
            <p>Owe: ${(parseFloat(person.owe))}</p>
          </div>
    
        </div>
        <div style = {{alignItems: 'right'}}>
            <IconButton onClick = {() => setShowLogs(!showLogs)} >
              <ExpandMoreIcon />
            </IconButton>
        </div>
      </div>

      <div>
        {showLogs && <PersonalLogs person = {person}/>}
      </div>

    </div>
  )
}

export default Person