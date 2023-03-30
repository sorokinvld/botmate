export default [
  {
    method: 'POST',
    path: '/auth/register',
    handler: 'auth.register',
  },
  {
    method: 'POST',
    path: '/auth/login',
    handler: 'auth.login',
  },
];
