module.exports = [
	{
		match: 'UA-XXXXX-X',
	  replacement: 'UA-58058140-1'
	},
	{
		match: '/api/',
	  replacement: 'http://api.ludiic.fr/api/'
	},
	{
		match: '/auth/',
	  replacement: 'http://api.ludiic.fr/auth/'
	},
		{
		match: 'script src=',
	  replacement: 'script async src='
	},
	{
		match: '21388',
		replacement: '14237'
	}
	]

	