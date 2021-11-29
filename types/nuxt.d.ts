import { Appsignal, AppsignalOptions } from '@appsignal/nodejs';

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $appsignal: Appsignal
  }

  interface Context {
    $appsignal: Appsignal
  }

  interface Configuration {
    appsignal?: AppsignalOptions
  }
}
