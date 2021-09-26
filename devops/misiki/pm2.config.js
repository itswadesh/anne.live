module.exports = {
  apps: [
    {
      name: 'misiki.in:4000',
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
