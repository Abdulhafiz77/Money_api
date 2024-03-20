module.exports = {
  openapi: '3.0.3',
  info: {
    version: '1.0.0',
    title: 'Swagger UI for MST DLP 0  User Carta Service',
    description: 'This documentation for INS BANK. Made by nodejs, expressjs, typescript. For authorization you have ti use token which can get from login api.',
    // termsOfService: 'https://example.com/',
    license: {
      name: 'MIT',
      url: 'https://openseource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'http://localhost:9050/api',
      description: 'Local server'
    },
    {
      url: 'http://188.166.66.95:9200/api',
      description: 'Dev server'
    }
  ],
  tags: [],
  "paths": require('./swagger/path'),
  components: {
    schemas: require('./swagger/components'),
    securitySchemes: {
      Bearer: {
        type: 'apiKey',
        in: 'header',
        name: 'authorization',
        description: 'Enter your bearer token in the format **Bearer &lt;token>**'
      }
    }
  }
};
