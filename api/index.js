const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const SENDGRID_API_KEY =
	'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'
app.post('/', (req, res, next) => {
	const emailBody = `
		<p>Name: ${req.body.contactName}</p>
		<p>Email: ${req.body.contactEmail}</p>
		<p>Phone: ${req.body.contactPhone}</p>
		<p>${req.body.contactMessage}</p>
	`

	const formData = {
		personalizations: [
			{
				to: [
					{
						email: 'info@ellcreative.com'
					}
				],
				subject: 'Website Inquiry'
			}
		],
		from: {
			email: req.body.contactEmail
		},
		content: [
			{
				type: 'text/html',
				value: emailBody
			}
		]
	}
	axios
		.post('https://api.sendgrid.com/v3/mail/send', formData, {
			headers: {
				Authorization: 'Bearer ' + SENDGRID_API_KEY,
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			res.send(true)
		})
		.catch(() => {
			res.send(false)
		})
})

module.exports = {
	path: '/api',
	handler: app
}
