const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://evagal0908_db_user:${password}@cluster0.nv15px5.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

if (process.argv.length == 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    const phonebook = new Phonebook({ name, number })

    phonebook.save().then(result => {
        console.log('phonebook entry saved!')
        mongoose.connection.close()
    })
}

if (process.argv.length == 3) {
    Phonebook.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(note => {
            console.log(note.name, note.number)
        })
        mongoose.connection.close()
    })
}

