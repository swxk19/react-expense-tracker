
const Person = ({person}) => {
  return (
    <div className = 'person'>
    <h4>{person.name}</h4>
    <p>Paid for: ${(person.paidFor).toFixed(2)}</p>
    <p>Owe: ${(person.owe).toFixed(2)}</p>
    </div>
  )
}

export default Person