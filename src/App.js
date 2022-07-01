import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AddExpense from './components/AddExpense'
import AddPerson from './components/AddPerson'
import Footer from './components/Footer'
import Header from './components/Header'
import LogPage from './components/LogPage'
import People from './components/People'
import { dateTime, JSON_API } from './Constants.js'



function App() {
  
  const [showAddPerson, setShowAddPerson] = useState(false)
  const [people, setPeople] = useState([])
  const [logs, setLogs] = useState([])



  const fetchLogs = async () => {
    const res = await fetch(
      `${JSON_API}/logs`
    )

    const data = await res.json()
    return data
  }

  useEffect(() => {

    const getLogs = async () => {
      const logsFromServer = await fetchLogs()

      setLogs(logsFromServer)
    }

    const getPeople = async () => {
      const peopleFromServer = await fetchPeople()

      setPeople(peopleFromServer)
    }

    getPeople()
    getLogs()
  }, [])


  const deleteLog = async (log) => {
    const proceed = window.confirm("Delete log?")

    if (!proceed) return 

    
    const ower = await fetchPerson(log.ower)
    const payer = await fetchPerson(log.payer)

    const updOwer = {
      ...ower,
      owe: (parseFloat(ower.owe) - parseFloat(log.amount)).toFixed(2)
    }
    const updPayer = {
      ...payer,
      paidFor: (parseFloat(payer.paidFor) - parseFloat(log.amount)).toFixed(2)
    }



    await fetch(`${JSON_API}/logs/${log.id}`, {
      method: 'DELETE'
    })

    await fetch(`${JSON_API}/people/${updOwer.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updOwer)
    })

    await fetch(`${JSON_API}/people/${updPayer.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updPayer)
    })

    setLogs(logs.filter((log2) => log2.id !== log.id))
    setPeople(people.map((person) => 
    person.name === updOwer.name ? {...person, owe : (parseFloat(person.owe) - parseFloat(log.amount)).toFixed(2)} : 
    person.name === updPayer.name ? {...person, paidFor : (parseFloat(person.paidFor) - parseFloat(log.amount)) .toFixed(2)} :
    person
  ))
  }

  

  const fetchPeople = async () => {
    const res = await fetch(
      `${JSON_API}/people`
    )

    const data = await res.json()
    return data
  }

  const fetchPerson = async (name) => {

    const filtered = await people.filter((person) => person.name === name.toUpperCase())

    if (filtered.length === 0) return false

  
    const res = await fetch(
      `${JSON_API}/people/${filtered[0].id}`
    )
    
    const data = await res.json()
    return data
  }




  const addPerson = async (name) => {

    
    const newPerson = {
      id: people.length + 1,
        name: name.toUpperCase(),
        paidFor: 0,
        owe: 0
    }

    const res = await fetch(`
    ${JSON_API}/people`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newPerson)
    })

 
    const data = await res.json()


    setPeople([...people, data])

  }

  const addLog = async (info) => {
    const newLog = {
      id: Math.floor(Math.random() * 10000) + (Math.random() * 10),
      ...info,
      ower: info.ower.toUpperCase(),
      payer: info.payer.toUpperCase(),
      time: dateTime
    }

    const res = await fetch(
    `${JSON_API}/logs`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newLog)
    })

    const data = await res.json()

    setLogs([...logs, data])

  } 

  const addExpenseAll = async (info) => {
    console.log(info)
    if (info.owers.length <= 0) {
      console.log("broke here")
      return
    }

    const ower = await fetchPerson(info.owers[info.owers.length - 1].name)
    const updOwer = {
      ...ower,
      owe: (parseFloat(ower.owe) + info.sharedAmount).toFixed(2)
    }
  

    await fetch(
      `${JSON_API}/people/${updOwer.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updOwer)
      }
    )
    
    

    const payer = await fetchPerson(info.payer)
    const updPayer = {
      ...payer,
      paidFor: (parseFloat(payer.paidFor) + info.sharedAmount).toFixed(2)
    }

    await fetch(
      `${JSON_API}/people/${updPayer.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updPayer)
      })

      const newOwers = info.owers.slice(0, info.owers.length -1)

      addLog({ower: ower.name, payer: payer.name, amount: info.sharedAmount})

      setPeople(people.map((person) => 
      person.name === updOwer.name ? {...person, owe : (parseFloat(person.owe) + parseFloat(info.sharedAmount)).toFixed(2)} : 
      person.name === updPayer.name ? {...person, paidFor : (parseFloat(person.paidFor) + parseFloat(info.sharedAmount)).toFixed(2)} :
      person
    ))

    
      addExpenseAll({...info, owers: newOwers})
  }

  const addExpense = async (info) => {

    const ower = await fetchPerson(info.ower)
    const payer = await fetchPerson(info.payer)

    if (!ower  || !payer) {
      alert("Ower or Payer does not exist")
      return
    }

    const updOwer = {
      ...ower,
      owe: parseFloat(ower.owe) + parseFloat(info.amount),
      personalLog: [...ower.personalLog, {id: ower.personalLog[ower.personalLog.length-1], log: ower.name + " owes " + payer.name + " " + info.amount}]
    }
    const updPayer = {
      ...payer, 
      paidFor: parseFloat(payer.paidFor) + parseFloat(info.amount),
      personalLog: [...ower.personalLog, ower.name + " owes " + payer.name + " " + info.amount]
    }
    

    await fetch(
      `${JSON_API}/people/${updOwer.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updOwer)
      }
    )

     await fetch(
      `${JSON_API}/people/${updPayer.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updPayer)
      }

    )

    setPeople(people.map((person) => 
      person.name === updOwer.name ? {...person, owe : (parseFloat(person.owe) + parseFloat(info.amount)).toFixed(2), personalLog: [...ower.personalLog, ower.name + " owes " + payer.name + " " + info.amount]} : 
      person.name === updPayer.name ? {...person, paidFor : (parseFloat(person.paidFor) + parseFloat(info.amount)) .toFixed(2), personalLog: [...ower.personalLog, ower.name + " owes " + payer.name + " " + info.amount]} :
      person
    ))



    addLog(info)

  }
  
  return (
    <Router>
    <div className="container">
      <Routes>
        <Route path = '/' 

        element = {<>
        <Header onAddPerson = {() => setShowAddPerson(!showAddPerson)} 
        title = 'Add Expenses' 
        showAddPerson = {showAddPerson}/>
        {showAddPerson && <AddPerson onAddPerson = {addPerson}/>}
        <AddExpense onAddExpense = {addExpense} onAddExpenseAll = {addExpenseAll} people = {people}/>
        <People people = {people}/></> }/>

        <Route path = '/logs' 
        element = {<LogPage logs = {logs} onDelete = {deleteLog} />}/>

      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
