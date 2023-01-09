const stringToSec = (str, addMs = true) => {
  let [s, ms] = str.split('.')
  ms = ms ?? 0
  // https://stackoverflow.com/a/45292588
  t = s.split(':').reduce((acc,time) => (60 * acc) + +time)
  return addMs ? t + '.' + ms : t;
}