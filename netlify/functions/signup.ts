import { Handler, HandlerEvent } from '@netlify/functions';
import Airtable from 'airtable';

// Initialize Airtable connection
const { AIRTABLE_KEY } = process.env;

//TABLE BASE HERE
const base = new Airtable({ apiKey: AIRTABLE_KEY }).base('appe5G5hEwPMyrlXD');

const handler: Handler = async (event: HandlerEvent, context: any) => {
	try {
		// Parse the body of the request
		const data = JSON.parse(event.body || '');

		// Make sure we got all data
		if (!data.email) {
			return {
				statusCode: 400,
				body: 'Please include email.'
			};
		}

		// TABLE NAME
		// Insert our data into the table columns
		await base('tbldv9gkcoZjwB49U').create({
			Email: data.email
		});

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'Thanks for signing up!'
			})
		};
	} catch (e: any) {
		return {
			statusCode: 500,
			body: e.message
		};
	}
};

export { handler };