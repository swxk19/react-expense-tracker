import { FaTimes } from 'react-icons/fa'

const PersonalLogs = ({person}) => {


  return (
    <div >
        <h4 style= {{textAlign: 'center'}}>History</h4>
        {person.personalLog.map((log) =>
        <div key= {log.id} style= {{display: 'flex', justifyContent: 'space-between', border: '1px solid black'}}> 
          <div style= {{textAlign: 'center', padding: 8}}>{log}</div>
          <FaTimes style = 
          {{color : 'red',
          cursor : 'pointer',
          }} 
            // onClick = {}
        />
        </div>)}
      </div>
  )
}

export default PersonalLogs