const { spawnSync } = require("child_process")

module.exports = async (kernel) => {
  // Local launchers can be used before they have a published Git upstream.
  const upstream = spawnSync(kernel.which("git"), [
    "rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{upstream}"
  ], { cwd: __dirname, encoding: "utf8" })

  return {
    run: [{
      when: upstream.status === 0,
      method: "shell.run",
      params: {
        message: '"{{which(\'git\')}}" pull --ff-only'
      }
    }, {
      method: "shell.run",
      params: {
        path: "app",
        message: '"{{which(\'git\')}}" pull --ff-only'
      }
    }, {
      method: "script.start",
      params: {
        uri: "install.js"
      }
    }]
  }
}
