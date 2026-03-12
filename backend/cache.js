const NodeCache = require("node-cache");

const cache = new NodeCache({
  stdTTL: 300 // 300 seconds = 5 minutes
});

module.exports = cache;