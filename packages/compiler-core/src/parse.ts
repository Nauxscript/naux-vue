import { NodeTypes } from './ast'

type Context = ReturnType<typeof createParseContext>

export const baseParse = (content: string) => {
  const context = createParseContext(content)
  return createRoot(parseChildren(context))
}

function parseChildren(context: Context) {
  let node

  const { source } = context

  if (source.startsWith('{{')) {
    // interpolation
    node = parseInterpolation (context)
  }
  else if (source.startsWith('<')) {
    // element
  }
  else {
    // text
    node = parseText(context)
  }
  return node
}

function createRoot(children) {
  return { children }
}

function createParseContext(content: string) {
  return { source: content }
}

function parseText(context: Context) {
  return [{
    type: NodeTypes.TEXT,
    content: context.source,
  }]
}

function parseInterpolation(context: Context): any {
  const content = context.source.replace(/{{|}}/g, '').trim()
  return [{
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content,
    },
  }]
}
