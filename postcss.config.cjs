const prune = require('postcss-jit-props');
const OpenProps = require('open-props');

module.exports = () => ({
	plugins: [
		prune(OpenProps),
	]
});
