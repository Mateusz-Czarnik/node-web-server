const express = require('express')
const hbs = require('hbs')

let app = express()

//handlebars config
hbs.registerPartials(`${__dirname}/views/partials`)
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.set('view enginge', 'hbs')
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

app.listen(3000, () => {
    console.log('Server is running on port 3000.')
})