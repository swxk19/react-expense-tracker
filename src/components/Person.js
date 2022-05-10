
const Person = ({person}) => {
  return (
    <div className = 'person'>
    <h4>{person.name}</h4>
    <p>Paid for: ${(person.paidFor)}</p>
    <p>Owe: ${(person.owe)}</p>
    </div>
  )
}

export default Person