const jobs: any[] = []
const activePreFlushCbs: any[] = []

export const nextTick = (fn?) => {
  return fn ? Promise.resolve().then(fn) : Promise.resolve()
}

export const queueJob = (job) => {
  if (!jobs.includes(job))
    jobs.push(job)
  queueFlush()
}

export const queuePreFlushJob = (job) => {
  if (!activePreFlushCbs.includes(job))
    activePreFlushCbs.push(job)
  queueFlush()
}

let flushPending = false
function queueFlush() {
  if (flushPending)
    return
  flushPending = true
  nextTick(flushJobs)
}

function flushJobs() {
  flushPreFlushCbs()
  flushPending = false
  while (jobs.length) {
    const job = jobs.shift()
    job()
  }
}

function flushPreFlushCbs() {
  for (let i = 0; i < activePreFlushCbs.length; i++)
    activePreFlushCbs[i]()
}
