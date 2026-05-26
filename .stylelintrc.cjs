module.exports = {
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-recommended-scss",
    "stylelint-config-recommended-vue/scss",
    "stylelint-config-html/vue",
    "stylelint-config-recess-order",
  ],

  plugins: ["stylelint-prettier"],
  overrides: [
    {
      files: ["**/*.{vue,html}"],
      customSyntax: "postcss-html",
    },
    {
      files: ["**/*.{css,scss}"],
      customSyntax: "postcss-scss",
    },
    {
      files: ["**/variables.module.scss"],
      rules: {
        "property-no-unknown": null,
      },
    },
  ],
  rules: {
    "prettier/prettier": true,
    "no-empty-source": null,
    "declaration-property-value-no-unknown": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "export", "deep"],
      },
    ],
    "no-invalid-position-declaration": null,
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
  },
};
