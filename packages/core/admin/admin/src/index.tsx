import ReactDOM from 'react-dom/client';
import { BotMateApp } from './BotMateApp';
import plugins from './plugins';

const root = ReactDOM.createRoot(document.getElementById('app'));

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}

async function main() {
  const app = new BotMateApp({
    appPlugins: plugins,
  });
  root.render(app.render());
}

main();
