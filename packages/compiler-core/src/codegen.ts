import { isString } from '@naux-vue/shared'
import { NodeTypes } from './ast'
import { CREATE_ELEMENT_VNODE, TO_DISPLAY_STRING, helperMapName } from './runtimeHelpers'

export function generate(ast) {
  const context = createCodegenContext()
  const { push } = context
  const functionName = 'render'
  const signtures = ['_ctx', '_cache']

  genFunctionPreamble(ast, context)

  push('return ')
  push(`function ${functionName}`)
  push(`(${signtures.join(',')}){`)
  push('return ')
  genNode(ast.codegenNode, context)
  push('}')

  return {
    code: context.code,
  }
}

function genFunctionPreamble(ast, context) {
  const { helpers } = ast
  if (!helpers.length)
    return
  const { push } = context
  const VueBinging = 'Vue'
  const aliasHelper = (s: string) => {
    const _s = helperMapName[s]
    return `${_s}: _${_s}`
  }
  push(`const {${helpers.map(aliasHelper).join(',')}} = ${VueBinging}`)
  push('\n')
}

function createCodegenContext() {
  const context = {
    code: '',
    push(source) {
      context.code += source
    },
    helper(name) {
      return `_${helperMapName[name]}`
    },
  }
  return context
}

function genNode(node: any, context) {
  // eslint-disable-next-line no-console
  console.log(node)
  switch (node.type) {
    case NodeTypes.TEXT:
      genText(node, context)
      break
    case NodeTypes.INTERPOLATION:
      genInterpolation(node, context)
      break
    case NodeTypes.SIMPLE_EXPRESSION:
      getExpression(node, context)
      break
    case NodeTypes.ELEMENT:
      genElement(node, context)
      break
    case NodeTypes.COMPOUND_EXPRESSION:
      genCompoundExpression(node, context)
      break
    default:
      break
  }
}

function genElement(node, context) {
  const { push, helper } = context
  const { tag, children, props } = node
  push(`(${helper(CREATE_ELEMENT_VNODE)}(`)
  // genNode(children[0], context)
  genNodeList(genNullableArgs([tag, props, children]), context)
  push('))')
}

function genNodeList(nodes: any[], context) {
  const { push } = context
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (isString(node))
      push(node)
    else
      genNode(node, context)

    if (i < nodes.length - 1)
      push(', ')
  }
}

function genText(node: any, context: any) {
  const { push } = context
  push(`"${node.content}"`)
}

function getExpression(node, context) {
  const { push } = context
  push(node.content)
}

function genInterpolation(node, context) {
  const { push, helper } = context
  push(`${helper(TO_DISPLAY_STRING)}(`)
  genNode(node.content, context)
  push(')')
}

function genCompoundExpression(node: any, context: any) {
  const { push } = context
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i]
    if (isString(child))
      push(child)
    else
      genNode(child, context)
  }
}

function genNullableArgs(args: any[]) {
  return args.map(arg => arg || 'null')
}
