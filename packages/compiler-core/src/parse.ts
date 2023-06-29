import { ElementTagTypes, NodeTypes } from './ast'

type Context = ReturnType<typeof createParseContext>

export const baseParse = (content: string) => {
  const context = createParseContext(content)
  return createRoot(parseChildren(context, ''))
}

function parseChildren(context: Context, tagName: string) {
  const nodes: any[] = []
  let node

  while (!isEnd(context, tagName)) {
    const { source } = context

    if (source.startsWith('{{')) {
    // interpolation
      node = parseInterpolation (context)
    }
    else if (source[0] === '<') {
    // element
      node = parseElement(context)
    }
    else {
    // text
      node = parseText(context)
    }

    nodes.push(node)
  }

  return nodes
}

function parseElement(context: Context) {
  const element: any = parseTag(context, ElementTagTypes.START)
  element.children = parseChildren(context, element.tag)
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
  const endTag = '{{'
  let endIndex = context.source.length
  const endTagIndex = context.source.indexOf(endTag)
  if (endTagIndex !== -1)
    endIndex = endTagIndex

  const content = parseTextData(context, endIndex)
  return {
    type: NodeTypes.TEXT,
    content,
  }
}

function parseTextData(context: Context, length: number) {
  const content = context.source.slice(0, length)
  advanceBy(context, length)
  return content
}

function parseInterpolation(context: Context): any {
  const openDelimiter = '{{'
  const closeDelimiter = '}}'

  // finde open delimiter index
  const closeDelimiterIndex = context.source.indexOf(closeDelimiter, openDelimiter.length)

  advanceBy(context, openDelimiter.length)

  const rawContentLength = closeDelimiterIndex - openDelimiter.length

  // get content
  // const content = context.source.slice(openDelimiter.length, closeDelimiterIndex)

  // remove the interpolation
  // advanceBy(context, closeDelimiterIndex + closeDelimiter.length)
  const rawContent = parseTextData(context, rawContentLength)
  advanceBy(context, closeDelimiter.length)

  const content = rawContent.trim()

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

function isEnd(context: Context, tagName: string) {
  if (tagName && context.source.startsWith(`</${tagName}>`))
    return true
  return !context.source
}
