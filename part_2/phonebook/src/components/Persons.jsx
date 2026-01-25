const Persons = ({ persons, onDelete }) => {
    return (
        <div style={{display: 'flex', gap: 15, flexDirection: 'column'}}>
            {persons && persons.map(({ name, number }) =>
                <div key={name} style={{display: 'flex', gap: 5}}>
                    <span key={name}>{name} {number}</span>
                    <button onClick={() => onDelete(name)}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default Persons