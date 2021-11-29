import Vue from 'vue';
import Appsignal from '@appsignal/javascript';

import { plugin as consolePlugin } from '@appsignal/plugin-breadcrumbs-console';
import { errorHandler } from '@appsignal/vue';

const appsignal = new Appsignal(<%= JSON.stringify(options.javascriptOptions) %>);
appsignal.use(consolePlugin({}));

Vue.config.errorHandler = errorHandler(appsignal, Vue);

/** @type {import('@nuxt/types').Plugin} */
export default (context, inject) => {
  appsignal.node = context.ssrContext.req.appsignal;
  inject('appsignal', appsignal);
  context.$appsignal = appsignal;
}
