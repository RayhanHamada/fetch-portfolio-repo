/**
 * @param {readonly string[]} tasks
 */
const tasks = (...tasks) => tasks.join(' && ');

module.exports = {
  'pre-commit': tasks('npm run lint', 'npm run fmt', 'git add .'),
};
