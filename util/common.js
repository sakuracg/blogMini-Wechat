const strArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const randomStr = function(n) {
  let text = ''
  for (let i = 0; i < n; i++) {
    let id = Math.floor(Math.random() * 62)
    text += strArr[id]
  }
  return text
}

const checkUserLogin = function(isShow = true) { // 未登录 则提示
  const token = wx.getStorageSync('token')
  if (!token) {
    if (isShow) {
      wx.showToast({
        title: '主银，您未登录喲~',
        icon: 'none',
      })
    }
    return false
  }
  return true
}


export {
  randomStr,
  checkUserLogin
}