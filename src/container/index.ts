// 创建di容器

import { asValue, createContainer, InjectionMode } from 'awilix'

const container = createContainer({
  injectionMode: InjectionMode.PROXY
})

export default container
