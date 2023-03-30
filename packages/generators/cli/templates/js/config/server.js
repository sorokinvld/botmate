'use strict';

module.exports = ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: 9732,
  url: 'http://localhost:9732',
});
