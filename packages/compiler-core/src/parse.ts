import { ElementTagTypes, NodeTypes } from './ast'

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
  else if (source[0] === '<') {
    // element
    node = parseElement(context)
    // eslint-disable-next-line no-console
    console.log('rest', context.source)
  }
  else {
    // text
    node = parseText(context)
  }
  nodes.push(node)
  return nodes
}

function parseElement(context: Context) {
  const element = parseTag(context, ElementTagTypes.START)
  parseTag(context, ElementTagTypes.END)
  return element
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
  advanceBy(context, closeDelimiterIndex + closeDelimiter.length)

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content,
    },
  }
}

function advanceBy(context: Context, lenOfCharacters: number) {
  context.source = context.source.slice(lenOfCharacters)
}

function parseTag(context, tagType: ElementTagTypes) {
  const matches = /^<\/?([a-z]*)/i.exec(context.source)
  if (matches) {
    const tag = matches[1]
    advanceBy(context, matches[0].length + 1)
    if (tagType !== ElementTagTypes.START)
      return
    return {
      type: NodeTypes.ELEMENT,
      tag,
    }
  }
}
