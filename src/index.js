import { resolve } from 'path';

import { expressMiddleware, expressErrorHandler } from '@appsignal/express';
import { Appsignal } from '@appsignal/nodejs';

import pkg from '../package.json';
export { pkg as meta };

export default function module (moduleOptions) {
  const appPkg = require(resolve(this.options.rootDir, 'package.json'));
  const latestCommit = process.env.NODE_ENV === 'development' ? 'dev' : process.env.HEROKU_SLUG_COMMIT || process.env.APPSIGNAL_REVISION_COMMIT;

  /** @type {import('@appsignal/nodejs').AppsignalOptions} */
  const defaultOptions = {
    // Set default identifiers
    active: true,
    name: appPkg.name,
    revision: [
      appPkg.version,
      latestCommit && latestCommit.substr(0, 7),
    ].filter(s => s).join('-'),
    environment: process.env.ENV || process.env.NODE_ENV,
    key: process.env.APPSIGNAL_PUSH_API_KEY,
  };

  const { nodeConfig, javascriptConfig, ...options } = Object.assign(defaultOptions, this.options.appsignal, moduleOptions);
  const nodeOptions = Object.assign({}, options, { apiKey: options.key }, nodeConfig);
  const javascriptOptions = Object.assign({}, options, javascriptConfig);

  if (nodeOptions.apiKey) {
    // Use Express middleware on server
    const appsignal = new Appsignal(nodeOptions);
    this.nuxt.hook('render:setupMiddleware', app => app.use(expressMiddleware(appsignal)));
    this.nuxt.hook('render:setupMiddleware', app => app.use((req, _, next) => {
      req.appsignal = appsignal;
      next();
    }));
    this.nuxt.hook('render:errorMiddleware', app => app.use(expressErrorHandler(appsignal)));

    // SSR plugin
    this.addPlugin({
      src: resolve(__dirname, 'plugin.server.js'),
      fileName: 'nuxt-appsignal.server.js',
      options: {
        nodeOptions,
        javascriptOptions,
      },
    });
  }

  if (javascriptOptions.key)
    // CSR plugin
    this.addPlugin({
      src: resolve(__dirname, 'plugin.client.js'),
      fileName: 'nuxt-appsignal.client.js',
      options: {
        nodeOptions,
        javascriptOptions,
      },
    });
}
