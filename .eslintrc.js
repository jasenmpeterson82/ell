module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
	  'standard',
	  'plugin:vue/recommended',
	  'prettier'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
		'parser': 'babel-eslint',
		'ecmaVersion': 2018,
		'sourceType': 'module'
  },
  'plugins': [
    'vue',
	  'prettier'
  ],
  'rules': {
	  'no-tabs': 0,
	  'prettier/prettier': "error",
	  'vue/no-v-html': 0,
	  'vue/html-indent': ['error', 'tab', {
		  'attribute': 1,
		  'baseIndent': 1,
		  'closeBracket': 0,
		  'alignAttributesVertically': true,
		  'ignores': []
	  }],
	  'vue/max-attributes-per-line': ['error', {
	  	'singleline': 3
	  }] ,
	  'vue/html-self-closing': 0,
	  'vue/v-on-style': ['error', 'longform'],
	  'vue/name-property-casing': 0,
	  'vue/attributes-order': ["error", {
		  "order": [
			  "LIST_RENDERING",
			  "DEFINITION",
			  "CONDITIONALS",
			  "RENDER_MODIFIERS",
			  "GLOBAL",
			  "UNIQUE",
			  "TWO_WAY_BINDING",
			  "OTHER_DIRECTIVES",
			  "OTHER_ATTR",
			  "EVENTS",
			  "CONTENT"
		  ]
	  }]
  }
}
