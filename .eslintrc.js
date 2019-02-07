module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ["plugin:vue/essential", "@vue/prettier"],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/html-end-tags': 'off',
    'vue/html-indent': 'off',
    'vue/html-quotes': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/mustache-interpolation-spacing': 'off',
    'vue/name-property-casing': 'off',
    'vue/no-multi-spaces': 'off',
    'vue/no-spaces-around-equal-signs-in-attribute': 'off',
    'vue/no-template-shadow': 'off',
    'vue/prop-name-casing': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/v-bind-style': 'off',
    'vue/v-on-style': 'off'
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  extends: ["plugin:vue/strongly-recommended", "@vue/prettier"],

  'extends': [
    'plugin:vue/strongly-recommended',
    '@vue/prettier'
  ]
};
