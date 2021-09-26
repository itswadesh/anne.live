module.exports = {
  apps: [
    {
      name: 'edeal.shop:6600',
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
