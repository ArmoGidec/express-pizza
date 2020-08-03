module.exports = {
  "outputDir": "/home/dicoder/codes/express-pizza/src/public",
  "devServer": {
    "proxy": {
      "^/api": {
        "target": "http://localhost:3000"
      }
    }
  },
  "configureWebpack": {
    "resolve": {
      "alias": {
        "$src": "/home/dicoder/codes/express-pizza/src/client/src"
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}