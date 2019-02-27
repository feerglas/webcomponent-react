module.exports = {
  "parser": "babel-eslint",
  "rules": {
    "strict": 0
  },
  "env": {
    "browser": true
  },
  "extends": "react-app",
  "parserOptions": {
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "comma-dangle": [
      "warn",
      "never"
    ],
	"dot-notation": 0,
	"func-names": 0,
	"global-require": 0,
	"import/no-dynamic-require": 0,
	"import/no-unresolved": 0,
	"indent": [2, "tab", { "SwitchCase": 1, "VariableDeclarator": 1 }],
	"jsx-a11y/anchor-has-content": 0,
	"jsx-a11y/href-no-hash": 0,
	"jsx-a11y/no-static-element-interactions": 0,
	"jsx-quotes": ["error", "prefer-single"],
	"linebreak-style": [
      "warn",
      "unix"
    ],
	"max-len": 0,
	"newline-after-var": ["warn", "always"],
	"newline-before-return": ["warn"],
	"no-alert": 0,
	"no-console": 0,
	"no-else-return": 0,
	"no-inline-comments": 0,
	"no-mixed-operators": 0,
	"no-multiple-empty-lines": [ 2, { "max": 1, "maxEOF": 0, "maxBOF": 0 } ],
	"no-plusplus": 0,
	"no-prototype-builtins": 0,
    "no-tabs": 0,
	"no-underscore-dangle": 0,
	"no-var": 0,
	"object-shorthand": 0,
	"one-var": ["error", { "var": "always" }],
	"padded-blocks": 0,
	"prefer-arrow-callback": 0,
	"prefer-template": 0,
    "quotes": [
      "error",
      "single"
    ],
	"react/forbid-prop-types": 0,
	"react/no-array-index-key": 0,
	"react/no-danger": 0,
	"react/no-did-mount-set-state": 0,
	"react/prefer-stateless-function": 0,
	"react/require-default-props": 0,
	"react/jsx-filename-extension": 0,
	"react/jsx-indent": [2, 'tab'],
	"react/jsx-indent-props": [2, 'tab'],
	"react/jsx-no-bind": 0,
	"react/no-find-dom-node": 0,
	"react/no-string-refs": 0,
    "semi": [
      "error",
      "always"
    ],
    /* Advanced Rules*/
    "no-unused-expressions": "warn",
    "no-useless-concat": "warn",
    "block-scoped-var": "error",
    "consistent-return": "error"
  }
};
