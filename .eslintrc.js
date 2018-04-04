module.exports = {
  "extends": "airbnb-base",
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "semi": [2, "always"],
    "eol-last": [2, "never"],
    "no-param-reassign": [0],
    "no-shadow": [0],
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": true,
      "optionalDependencies": false,
      "peerDependencies": false
    }]
  }
};