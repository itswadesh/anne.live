module.exports = {
  apps: [
    {
      name: 'mywondermall.com:3300',
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
