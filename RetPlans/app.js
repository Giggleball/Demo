'use strict'
// including the necessary modules
const express = require( 'express' )
const fs = require( 'fs' )
const app = express()
// in order to use bodyParser, you need to install and require it first
const bodyParser = require('body-parser')

// which visual template you'll be using 
app.set( 'view engine', 'pug' )
app.set( 'views', __dirname + '/views' )

// Need this to use the middleware .body
app.use( bodyParser.urlencoded({ extended: true }))

// when home is requested, show the following
app.get( '/', ( request, response ) => {
	console.log( 'About to render index.pug' )
	fs.readFile( __dirname + '/users.json', ( error, data ) => {
		if ( error ) throw error
			let parsedData = JSON.parse( data )
		console.log( parsedData )
		response.render( 'index', { data: parsedData } )
	})
})




// Import necessary modules
//const fs = require( 'fs' )

// Helper functions to Round off # & make it more readible
let roundD = ( number ) => {
	return Math.round( number * 100 ) / 100
} 
let addCommas = ( number ) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
let prettyNr = ( number ) => {
	return addCommas( roundD( number ) )
}

// Read the customer.json data

fs.readFile( __dirname + '/customers.json', 'utf-8', ( err, data ) => {
	// Parse the file to a readable object
	let parsedData = JSON.parse( data )
	calcCompound( parsedData )
} )

// Function to calculate compound interest from a customer object
let calcCompound = ( customer ) => {
	
	// Set end amount prop calculate total duration
	customer.pension.endamount = { 
		pessimitic:	customer.finances.startcapital,
		average: 	customer.finances.startcapital,
		optimistic: customer.finances.startcapital
	}
	customer.pension.duration = (customer.pension.age - customer.age)
	
// starts with # times you loop, count down to 0, 
	// Do the intrest math
	for (var i = customer.pension.duration - 1; i >= 0; i--) {

		// Add monthly spend to all scenarios9
		customer.pension.endamount.pessimistic 	+= ( customer.finances.monthlyadd * 12 )
		customer.pension.endamount.average 		+= ( customer.finances.monthlyadd * 12 )
		customer.pension.endamount.optimistic 	+= ( customer.finances.monthlyadd * 12 )

		// Calculate the added amount interest
		customer.pension.endamount.pessimistic 	*= customer.pension.interest.pessimistic
		customer.pension.endamount.average 		*= customer.pension.interest.average
		customer.pension.endamount.optimistic 	*= customer.pension.interest.optimistic

	}

	// Output data
	// Welcome out customer
	console.log( " Welcome" + customer.name 	+ " to our advanced pension planner!")
	console.log( "You are starting with " 		+ customer.finances.startcapital + " and add a monthly amount of " + customer.finances.monthlyadd)
	console.log( "When you retire at age " 		+ customer.pension.age + " You will have the following: ")
	
	// Output calculation stuff
	console.log( "In a pessimitic scenario: €" 	+ prettyNr( customer.pension.endamount.pessimitic))
	console.log( "In a average scenario: €" 	+ prettyNr( customer.pension.endamount.average))
	console.log( "In a optimistic scenario:	€" 	+ prettyNr( customer.pension.endamount.optimistic))
}

// exporting the file
module.exports = calcCompound




app.listen(8000, () => {
	console.log( 'Server running' )
})






// Phase #1
// Create a web form where people can input their retirement plans
// Requirements:
// * The page uses a framework like bootstrap/materialize
// * The user can input all variables used in the compound interest exercise
// * The form uses POST as a method for security reasons

// Phase #2
// After the user submits the form, display their retirement statistics
// Requirements:
// * After submitting the form, nodejs calculates the pension statistics and pug displays them
// * The results are personalised (e.g. "Hello Mentor! Your retirement options look like this:")
// * All scenarios (optimistic, neutral, pessimistic) are displayed

// Phase #3
// The user predicts a x% (for example 5%) increase of invested income every year, add this to your app

// Phase #4
// The interest of invested money fluctiates randomly between the pessimistic and optimistic values each year. 
// Add a 'simulate reality' option to your form that calculates a possible pension based on these random values.

// Phase #5
// The S&P 500 is an index fund known by investors worldwide. Create a separate page that allows you to calculate 
// how much money you would have retired with if you invested in the S&P 500 from 1950 to 2015. You will need this 
// historical data: http://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html
// The form on the page should allow you to fill in all the usual values, but the interest rates are instead based 
// on the historical data.

// Phase #UB3RL33T
// Modify this whole app to run client side, so purely in chrome.














