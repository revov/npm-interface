module.exports = function escapeshellarg (arg) {
  var ret = ''

  ret = arg.replace(/[^\\]'/g, function (m, i, s) {
    return m.slice(0, 1) + '\\\''
  })

  return "'" + ret + "'"
}