import Button from './Button'

const Header = ({title, onAddPerson, showAddPerson}) => {

    
  return (
    <header className = 'header'>
        <h2>{title}</h2>
        {/* <Button color = { showAddPerson ? 'red' : 'steelblue' }
        text = {showAddPerson ? 'Close' : 
        'Add Person'} onClick = {onAddPerson} /> */}
        
        

    </header>
  )
}

export default Header