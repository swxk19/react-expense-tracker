
const Person = ({person}) => {
  return (
    <div className = 'person'>
    <h4>{person.name}</h4>
    <p>Paid for: ${(parseFloat(person.paidFor))}</p>
    <p>Owe: ${(parseFloat(person.owe))}</p>
    </div>
  )
}

export default Person