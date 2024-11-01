const format = (isoTimeStr) => {
  return isoTimeStr.replace('T',' ').substring(0, 19)
}

export { format }
