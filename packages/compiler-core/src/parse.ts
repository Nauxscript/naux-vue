import { NodeTypes } from './ast'

type Context = ReturnType<typeof createParseContext>

export const baseParse = (content: string) => {
  const context = createParseContext(content)
  return createRoot(parseChildren(context))
}

function parseChildren(context: Context) {
  const nodes: any[] = []
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
  nodes.push(node)
  return nodes
}

function createRoot(children) {
  return { children }
}

function createParseContext(content: string) {
  return { source: content }
}

function parseText(context: Context) {
  return {
    type: NodeTypes.TEXT,
    content: context.source,
  }
}

function parseInterpolation(context: Context): any {
  const openDelimiter = '{{'
  const closeDelimiter = '}}'

  // finde open delimiter index
  const closeDelimiterIndex = context.source.indexOf(closeDelimiter, openDelimiter.length)

  // get content
  const content = context.source.slice(openDelimiter.length, closeDelimiterIndex).trim()

  // remove the interpolation
  context.source = context.source.slice(closeDelimiterIndex + closeDelimiter.length)

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content,
    },
  }
}
