function constructURL(url, fl) {
  url = '?'
  Object.keys(fl).forEach((e) => {
    // if (e == 'limit' || e == 'skip') return
    if (
      fl[e] &&
      fl[e] !== 'undefined' &&
      e !== 'categories' &&
      fl[e].length > 0
    )
      url += `${e}=${fl[e]}&`
  })
  return url.replace(/&$/, '')
}
export { constructURL }
