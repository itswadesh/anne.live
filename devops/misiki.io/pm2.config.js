module.exports = {
  apps: [
    {
      name: 'misiki.io:7700',
      script: 'npm',
      automation: false,
      args: 'start',
      env: {
        NODE_ENV: 'development',
      },
      envProduction: {
        NODE_ENV: 'production',
      },
    },
  ],
}
