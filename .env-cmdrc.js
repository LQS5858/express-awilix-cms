module.exports = {
  development: {
    NODE_ENV: 'development',
    CONFIG_PROPERTIES: 'config.test.properties',
    SERVICE_URI: 'http://8.210.157.94:38080/api/'
  },
  test: {
    NODE_ENV: 'test',
    CONFIG_PROPERTIES: 'config.test.properties',
    SERVICE_URI: 'http://8.210.157.94:38080/api/'
  },
  production: {
    NODE_ENV: 'production',
    CONFIG_PROPERTIES: 'config.properties',
    SERVICE_URI: 'http://8.210.157.94:38080/api/'
  }
}
