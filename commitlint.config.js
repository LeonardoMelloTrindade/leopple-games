const Configuration = {
  extends: ["@commitlint/config-conventional"],

  rules: {
    "type-empty": [2, "never"],
    "scope-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
        "release",
      ],
    ],
  },

  // Não precisa de plugin customizado agora
  plugins: [],
};

module.exports = Configuration;
