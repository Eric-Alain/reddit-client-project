export const htmlDecode = input => {
  let doc = new DOMParser().parseFromString(input, 'text/html')
  return doc.documentElement.textContent
}

export const getLang = () => {
  if (navigator.languages !== undefined) return navigator.languages[0]
  return navigator.language
}

export const renderDate = num => {
  const date = num * 1000
  const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return new Date(date).toLocaleDateString(getLang(), dateOptions)
}

export const nFormatter = (num, digits) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0'
}

export const unique = arr => {
  let seen = {}
  return arr.filter(item => {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true)
  })
}

export const prioritizePostsWithImages = obj => {
  return obj.sort((a, b) => {
    var aVal = a.previewImage === undefined ? 0 : 1
    var bVal = b.previewImage === undefined ? 0 : 1
    return bVal - aVal
  })
}
