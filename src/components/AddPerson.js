import {useState} from 'react'


const AddPerson = ({onAddPerson}) => {

    const [text, setText] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert('Person name is empty!')
            return
        }

        onAddPerson(text)
        setText('')
    }

    return (
        <form className = 'add-form' onSubmit= {onSubmit}>
        <div className = 'form-control'>
            <label>New person </label>
            <input type = 'text' placeholder = 'Name'
            value = {text} onChange = {(e) => setText(e.target.value)}>
            </input>
        </div>


        <input type = 'submit' value = 'Submit' 
        className = 'btn btn-block1'/>
        </form>
    )
}

export default AddPerson