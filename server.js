const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
let app = express()

//Handlebars config
hbs.registerPartials(`${__dirname}/views/partials`)
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

//Register middleware
app.set('view enginge', 'hbs')
app.use((req, res, next) => {
    let now = new Date().toString()
    let log = `${now}: ${req.method} ${req.url}`

    fs.appendFile('server.log', `${log} \n`, (err) => {
        if (err) {
            console.log('Unable to append to server.log.')
        }
    })

    console.log(log)
    next()
})
// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })
app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello on home page!',
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
})

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to load data.'
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})