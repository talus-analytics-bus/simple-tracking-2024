const simplifyForUrl = (string: string) =>
  string.trim().replace(/[\/ ]/g, '-').replace(/[,.]/g, '').toLowerCase()

export default simplifyForUrl
