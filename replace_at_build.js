module.exports = [
	{
		match: 'UA-XXXXX-X',
	  replacement: 'UA-58058140-1'
	},
	{
		match: 'http://localhost:9000',
	  replacement: 'http://api.ludiic.fr'
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

	