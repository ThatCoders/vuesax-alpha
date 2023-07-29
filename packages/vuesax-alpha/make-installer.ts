import { provideGlobalConfig } from '@vuesax-alpha/hooks'
import { INSTALLED_KEY } from '@vuesax-alpha/constants'
import { version } from './version'

import type { App, Plugin } from 'vue'
import type { ConfigProviderContext } from '@vuesax-alpha/tokens'

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: ConfigProviderContext) => {
    if (app[INSTALLED_KEY]) return

    app[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))

    if (options) provideGlobalConfig(options, app, true)
  }

  return {
    version,
    install,
  }
}
