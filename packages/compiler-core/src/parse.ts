export const baseParse = (content: string) => {
  const context = createParseContext(content)
  return createRoot(parseChildren(context))
}

function parseChildren(context) {
  const content = context.content.replace(/{{|}}/g, '').trim()
  // const regex = /{{(.+?)}}/g;
  // const matches = context.content.match(regex);

  // if (matches) {
  //   const content = matches.map(match => match.replace(/{{|}}/g, "").trim());
  //   console.log(content); // ["message"]
  // } else {
  //   console.log("No matches found.");
  // }
  return [{
    type: 'INTERPOLATION',
    content: {
      type: 'SIMPLE_EXPRESSION',
      content,
    },
  }]
}

function createRoot(children) {
  return { children }
}

function createParseContext(content: string) {
  return { content }
}
