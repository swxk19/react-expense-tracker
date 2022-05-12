import Header from './components/Header'
import AddExpense from './components/AddExpense'
import People from './components/People'
import AddPerson from './components/AddPerson'
import Footer from './components/Footer'
import LogPage from './components/LogPage'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {useEffect, useState} from 'react'


function App() {

  const [showAddPerson, setShowAddPerson] = useState(false)
  const [people, setPeople] = useState([])
  const [logs, setLogs] = useState([])


  const fetchLogs = async () => {
    const res = await fetch(
      'http://localhost:5000/logs'
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
      owe: parseFloat(ower.owe) - parseFloat(log.amount)
    }
    const updPayer = {
      ...payer,
      paidFor: parseFloat(payer.paidFor) - parseFloat(log.amount)
    }



    await fetch(`http://localhost:5000/logs/${log.id}`, {
      method: 'DELETE'
    })

    await fetch(`http://localhost:5000/people/${updOwer.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updOwer)
    })

    await fetch(`http://localhost:5000/people/${updPayer.id}`, {
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
      'http://localhost:5000/people'
    )

    const data = await res.json()
    return data
  }

  const fetchPerson = async (name) => {

    const filtered = await people.filter((person) => person.name === name.toUpperCase())
    
    if (filtered.length === 0) return false

  
    const res = await fetch(
      `http://localhost:5000/people/${filtered[0].id}`
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
    http://localhost:5000/people`, {
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
      id: logs.length + 1,
      ...info,
      ower: info.ower.toUpperCase(),
      payer: info.payer.toUpperCase()
    }

    const res = await fetch(
    `http://localhost:5000/logs`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newLog)
    })

    const data = await res.json()

    setLogs([...logs, data])

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
      owe: parseFloat(ower.owe) + parseFloat(info.amount)
    }
    const updPayer = {
      ...payer, 
      paidFor: parseFloat(payer.paidFor) + parseFloat(info.amount)
    }

    const resOwer = await fetch(
      `http://localhost:5000/people/${updOwer.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updOwer)
      }
    )

    const resPayer = await fetch(
      `http://localhost:5000/people/${updPayer.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updPayer)
      }

    )

    setPeople(people.map((person) => 
      person.name === updOwer.name ? {...person, owe : (parseFloat(person.owe) + parseFloat(info.amount)).toFixed(2)} : 
      person.name === updPayer.name ? {...person, paidFor : (parseFloat(person.paidFor) + parseFloat(info.amount)) .toFixed(2)} :
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
        <AddExpense onAddExpense = {addExpense} people = {people}/>
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
