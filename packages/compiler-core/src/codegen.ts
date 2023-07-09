import { NodeTypes } from './ast'
import { TO_DISPLAY_STRING, helperMapName } from './runtimeHelpers'

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
    case NodeTypes.SIMPLE_EXPRESSION:
      genCompoundExpression(node, context)
      break
    case NodeTypes.INTERPOLATION:
      genInterpolation(node, context)
      break
    default:
      break
  }
}

function genText(node: any, context: any) {
  const { push } = context
  push(`'${node.content}'`)
}

function genInterpolation(node, context) {
  const { push, helper } = context
  push(`${helper(TO_DISPLAY_STRING)}(`)
  genNode(node.content, context)
  push(')')
}

function genCompoundExpression(node: any, context: any) {
  const { push } = context
  push(node.content)
}
