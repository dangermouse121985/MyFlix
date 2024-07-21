module.exports = {
  apps: [
    {
      name: 'myFlixAPI',
      script: './index.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
        MONGODB_URI: process.env.CONNECTION_URI // This will pull from your .env file if configured properly
      },
      env_production: {
        NODE_ENV: 'production',
        MONGODB_URI: process.env.CONNECTION_URI // This will pull from your .env file if configured properly
      }
    }
  ]
};

