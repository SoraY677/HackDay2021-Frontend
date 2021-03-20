const path = require('path')
const express = require('express')
const app = express()
const DIST_DIR = path.join(__dirname, "dist")
const CSS_DIR = path.join(__dirname, "style")
const HTML_FILE = path.join(__dirname, 'index.html')
app.use(express.static(DIST_DIR), express.static(CSS_DIR))
app.get('*', (req, res) => {
	res.sendFile(HTML_FILE)
})
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log(`App listening to ${PORT}....`)
	console.log('Press Ctrl+C to quit.')
})