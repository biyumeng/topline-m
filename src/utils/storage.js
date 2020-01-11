// 专门操作本地token的存储

export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    console.log('转换失败', err)
    return data
  }
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
