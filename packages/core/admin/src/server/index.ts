import routes from './routes';
import controllers from './controllers';
import services from './services';
export default {
  controllers,
  routes,
  services,
  bootstrap() {
    console.log('[admin] bootstrap');
  },
};
