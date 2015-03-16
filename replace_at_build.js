module.exports = [
	{
		match: 'UA-58058140-2',
	  replacement: 'UA-58058140-1'
	},
	{
		match: '\"api',
	  replacement: '\"http://api.ludiic.fr/api'
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

	