import { ElementTagTypes, NodeTypes } from './ast'

type Context = ReturnType<typeof createParseContext>

export const baseParse = (content: string) => {
  const context = createParseContext(content)
  return createRoot(parseChildren(context, []))
}

function parseChildren(context: Context, ancestors: string[]) {
  const nodes: any[] = []
  let node

  while (!isEnd(context, ancestors)) {
    // eslint-disable-next-line no-console
    console.log(context.source)
    const { source } = context

    if (source.startsWith('{{')) {
    // interpolation
      node = parseInterpolation (context)
    }
    else if (source[0] === '<') {
    // element
      node = parseElement(context, ancestors)
    }
    else {
    // text
      node = parseText(context)
    }

    nodes.push(node)
  }

  return nodes
}

function isEnd(context: Context, ancestors: string[]) {
  const { source } = context
  if (!source)
    return true

  for (let i = ancestors.length - 1; i >= 0; i--) {
    if (isThisTagClosing(ancestors[i], source))
      return true
  }
}

function parseElement(context: Context, ancestors: string[]) {
  const element: any = parseTag(context, ElementTagTypes.START)
  ancestors.push(element.tag)
  element.children = parseChildren(context, ancestors)
  ancestors.pop()
  if (isThisTagClosing(element.tag, context.source))
    parseTag(context, ElementTagTypes.END)
  else
    throw new Error(`missing closed tag: ${element.tag}`)

  return element
}

function isThisTagClosing(tagName: string, source: string) {
  return source.startsWith('</') && source.slice(2, 2 + tagName.length) === tagName
}

function createRoot(children) {
  return { children }
}

function createParseContext(content: string) {
  return { source: content }
}

function parseText(context: Context) {
  const endTags = ['{{', '<']
  let endIndex = context.source.length
  for (let i = 0; i < endTags.length; i++) {
    const endTagIndex = context.source.indexOf(endTags[i])
    if (endTagIndex !== -1 && endTagIndex < endIndex)
      endIndex = endTagIndex
  }

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
