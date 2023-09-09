module.exports = {
  development: {
    NODE_ENV: 'development',
    CONFIG_PROPERTIES: 'config.test.properties'
  },
  test: {
    NODE_ENV: 'test',
    CONFIG_PROPERTIES: 'config.test.properties'
  },
  production: {
    NODE_ENV: 'production',
    CONFIG_PROPERTIES: 'config.properties'
  }
}
