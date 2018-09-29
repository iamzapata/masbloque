const fromCharCode = charCode => {
  const [code, repeat = 1] = charCode.split("#")
  return String.fromCharCode(code).repeat(repeat)
}

export default fromCharCode
