import register from './register';
import setup from './setup';

export default () => ({
  register,
  bootstrap: setup,
});