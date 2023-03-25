'use strict';

export default ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env.int('PORT', 9732),
  url: 'http://localhost:9732',
});
