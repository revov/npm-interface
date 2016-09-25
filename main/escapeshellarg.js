module.exports = function escapeshellarg (arg) {
  return `'${arg.replace(/'/g, "'\\''")}'`;
}
