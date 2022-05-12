import Person from './Person'
// import {FaTimes} from 'react-icons/fa'

const People = ({people}) => {
  return (
    <>
    {
        people.map((person) => (
        <Person key = {person.id} 
        person = {person}/>)
        )
    }
    </>
  )
}

export default People