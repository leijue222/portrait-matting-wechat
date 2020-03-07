const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function randomTimeNum() {
  var time = new Date()
  var year = time.getFullYear().toString();
  var month = (time.getMonth() + 1).toString();
  var day = time.getDate().toString();
  var hour = time.getHours().toString();
  var minute = time.getMinutes().toString();
  var second = time.getSeconds().toString();
  var randomNumber = year.concat(month, day, hour, minute, second);
  return randomNumber;
}

module.exports = {
  formatTime: formatTime,
  randomTimeNum: randomTimeNum
}
