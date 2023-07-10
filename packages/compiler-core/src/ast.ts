import { CREATE_ELEMENT_VNODE } from './runtimeHelpers'

export enum NodeTypes {
  TEXT,
  INTERPOLATION,
  SIMPLE_EXPRESSION,
  ELEMENT,
  ROOT,
  COMPOUND_EXPRESSION,
}

export enum ElementTagTypes {
  START,
  END,
}

export const createVNodeCall = (context, tag, props?, children?) => {
  context.helper(CREATE_ELEMENT_VNODE)
  return {
    type: NodeTypes.ELEMENT,
    props,
    tag,
    children,
  }
}
