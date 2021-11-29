# AppSignal module for Nuxt
> Use AppSignal with Nuxt

## Usage
```ts
export default {
  modules: [
    '@sigbit/nuxt-appsignal',
  ],
  appsignal: {
    // AppSignal config
    // ...

    // Passed to @appsignal/node
    nodeConfig: {},
    // Passed to @appsignal/javascript
    javascriptConfig: {},
  }
}
```

### AppSignal name and revision
AppSignal will automatically use your app name and version from `package.json` to tag errors.