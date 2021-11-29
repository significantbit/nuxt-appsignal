// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue';
import { Appsignal } from '@appsignal/nodejs';

declare module 'vue/types/vue' {
  interface Vue {
    $appsignal: Appsignal
  }
}
