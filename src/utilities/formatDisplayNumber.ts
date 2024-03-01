const format = Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3,
  notation: 'compact',
})

const formatDisplayNumber = (num: number) => {
  if (num < 1000) return num

  const tier = (Math.log10(num) / 3) | 0
  const scale = Math.pow(10, tier * 3)
  const scaled = num / scale

  let round = scaled
  if (scaled < 10) round = (Math.round((scaled * 10) / 5) * 5) / 10
  else if (scaled > 100) round = Math.round(scaled / 5) * 5
  else round = Math.round(scaled)

  return format.format(round * scale)
}

export default formatDisplayNumber
