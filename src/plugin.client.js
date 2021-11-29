import Vue from 'vue';
import Appsignal from '@appsignal/javascript';

import { plugin as consolePlugin } from '@appsignal/plugin-breadcrumbs-console';
import { plugin as networkPlugin } from '@appsignal/plugin-breadcrumbs-network';
import { plugin as windowPlugin } from '@appsignal/plugin-window-events';
import { plugin as pathPlugin } from '@appsignal/plugin-path-decorator';
import { errorHandler } from '@appsignal/vue';

const appsignal = new Appsignal(<%= JSON.stringify(options.javascriptOptions) %>);

appsignal.use(consolePlugin({}));
appsignal.use(networkPlugin({}));
appsignal.use(windowPlugin({}));
appsignal.use(pathPlugin({}));

Vue.config.errorHandler = errorHandler(appsignal, Vue);

/** @type {import('@nuxt/types').Plugin} */
export default (context, inject) => {
  inject('appsignal', appsignal);
  context.$appsignal = appsignal;
}
