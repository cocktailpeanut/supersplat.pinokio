module.exports = {
  run: [{
    when: "{{!exists('app')}}",
    method: "shell.run",
    params: {
      message: '"{{which(\'git\')}}" clone https://github.com/playcanvas/supersplat.git app'
    }
  }, {
    method: "shell.run",
    params: {
      path: "app",
      env: {
        npm_config_engine_strict: "true"
      },
      message: [
        '"{{which(\'npm\')}}" ci --include=dev',
        '"{{which(\'npm\')}}" run build'
      ]
    }
  }]
}
