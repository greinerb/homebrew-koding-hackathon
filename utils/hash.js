var crypto = require('crypto');
exports.hashVal = function(pwd, fn) {
  var hash = crypto.createHash('sha256').update(pwd).digest('hex');
  fn(null, hash);
};

