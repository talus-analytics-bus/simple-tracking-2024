// formatting for converting headers to has urls
const formatHash = (str: string) =>
  str.trim().replaceAll(' ', '-').toLowerCase()

export default formatHash
