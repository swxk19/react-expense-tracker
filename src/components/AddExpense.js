import {useState} from 'react'


const AddExpense = ({onAddExpense, people}) => {

    const [payer, setPayer] = useState('')
    const [ower, setOwer] = useState('')
    const [amount, setAmount] = useState('')

    const sendIt = (ower) => {
        console.log(ower)
        onAddExpense({ower, payer, amount})
    }

    const onSubmit = (e) => {
        e.preventDefault()


        if (!payer || !ower || !amount) {
            alert('Missing fields!')
            return 
        }

        if (ower.toUpperCase() === "ALL") {
            const owers = people.filter((person) => person.name !== payer.toUpperCase())
            console.log(owers)
            for (let i = 0; i < owers.length; i++) {
                console.log(owers[i])
                sendIt(owers[i].name)
            }

        } else { 
            onAddExpense({ower, payer, amount})
        }
        setPayer('')
        setOwer('')
        setAmount('')
    }

    return (
        <form className = 'add-form' onSubmit = {onSubmit}>
        <div className = 'form-control'>
            <label>Ower </label>
            <input type = 'text' placeholder = 'Name'
            value = {ower} onChange = {(e) => setOwer(e.target.value)}></input>
        </div>

        <h4>owes</h4>

        <div className = 'form-control'>
        <label>Payer</label>
            <input type = 'text' placeholder = 'Name'
            value = {payer} onChange = {(e) => setPayer(e.target.value)}></input>
        </div>

        <div className = 'form-control2'>
        <label>$</label>
            <input inputMode = 'numeric'type = 'number' placeholder = 'Amount'
            value = {amount} onChange = {(e) => setAmount(e.target.value)}></input>
        </div>

        <input type = 'submit' value = 'Confirm' 
        className = 'btn btn-block2'/>
        </form>
    )
}

export default AddExpense