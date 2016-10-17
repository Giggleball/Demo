const express = require( 'express' );

const app	= express();

app.get('/', (request, response) => {
	response.send( 'Hello Giggleball, it is so good to see you in the browser!' );

});

app.listen(2000, () => {

	console.log( "I am listening" ) 
});