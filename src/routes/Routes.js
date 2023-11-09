import {useRoutes} from './router';
import getConfig from '../core/helpers/routes';
import config from './config';

function Routes() {
  const routes = useRoutes(getConfig(config));
  return routes;
}

export default Routes;
