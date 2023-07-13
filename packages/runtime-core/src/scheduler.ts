const jobs: any[] = []

export const nextTick = (fn?) => {
  return fn ? Promise.resolve().then(fn) : Promise.resolve()
}

export const queueJob = (job) => {
  if (!jobs.includes(job))
    jobs.push(job)
  flushJobs()
}
let flushPending = false
function flushJobs() {
  if (flushPending)
    return
  flushPending = true
  nextTick(() => {
    flushPending = false
    while (jobs.length) {
      const job = jobs.shift()
      job()
    }
  })
}
