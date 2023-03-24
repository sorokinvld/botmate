'use strict';

module.exports = ({ env }) => ({
	host: env('HOST', 'localhost'),
	port: env.int('PORT', 9732),
	url: 'http://localhost:4345',
});
