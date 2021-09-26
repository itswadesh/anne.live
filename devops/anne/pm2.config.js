module.exports = {
  apps: [
    {
      name: 'anne.biz:5500',
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
