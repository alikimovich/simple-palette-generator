export function applyLocalStyles() 
{
    const localStyles = figma.getLocalPaintStyles();
let localStylesArray: any[] = [];
let count = 0;
const selection = figma.currentPage.selection;

figma.skipInvisibleInstanceChildren = true;

for (const localStyle of localStyles) {
  if ("color" in localStyle.paints[0]) {
    if (localStyle.name.includes(' Light')) {
      const altName = localStyle.name.replace(' Light', '');
      const localStyleSimplified = {id: localStyle.id, name: altName};
      localStylesArray.push(localStyleSimplified);
    } else if (localStyle.name.includes('&')) {
      const altName = localStyle.name.replace('&', 'and');
      const localStyleSimplified = {id: localStyle.id, name: altName};
      localStylesArray.push(localStyleSimplified);
    } else if (localStyle.name.includes('and')) {
      let altName = localStyle.name.replace('and', '&');
      altName = altName.replace('  ',' ');
      const localStyleSimplified = {id: localStyle.id, name: altName};
      localStylesArray.push(localStyleSimplified);
    } else {
      const altName = localStyle.name + ' Light';
      const localStyleSimplified = {id: localStyle.id, name: altName};
      localStylesArray.push(localStyleSimplified);
    }

    const localStyleSimplified = {id: localStyle.id, name: localStyle.name}
    localStylesArray.push(localStyleSimplified);
  }
}

function addNewNodeToSelection(page: PageNode, node: SceneNode) {
  // .concat() creates a new array
  page.selection = page.selection.concat(node)
}

async function iterateSelectionAndReplace() {
    //now we iterate through every node in the selection
    const selectedNodes = figma.currentPage.selection;
    figma.currentPage.selection = [];
    for (const i in selectedNodes) {
      replaceColors(localStylesArray, [selectedNodes[i]])
      // iterate and add child nodes
      if ("children" in selectedNodes[i] ) {
        const childrenNodes = selectedNodes[i].findAllWithCriteria({
          types: ['BOOLEAN_OPERATION',
            'COMPONENT',
            'COMPONENT_SET',
            'ELLIPSE',
            'FRAME',
            'INSTANCE',
            'LINE',
            'POLYGON',
            'RECTANGLE',
            'SHAPE_WITH_TEXT',
            'STAR',
            'TEXT',
            'VECTOR',
            'GROUP']
        });;
        for (const child of childrenNodes) {
          replaceColors(localStylesArray, [child])
        }
      }
    }
}

const nodes = figma.currentPage.findAllWithCriteria({
  types: ['BOOLEAN_OPERATION',
    'COMPONENT',
    'COMPONENT_SET',
    'ELLIPSE',
    'FRAME',
    'INSTANCE',
    'LINE',
    'POLYGON',
    'RECTANGLE',
    'SHAPE_WITH_TEXT',
    'STAR',
    'TEXT',
    'VECTOR',
    'GROUP']
});

function replaceColors(localStylesArray: any[], nodes) {
for (const node of nodes) {
  if ("fills" in node && node.fillStyleId !== '') {
    const tempStyle = {id: node.fillStyleId, name: figma.getStyleById(String(node.fillStyleId))?.name};

    if (localStylesArray.some(elem => elem.name === tempStyle.name)) {
      let localStyle = localStylesArray.find(elem => elem.name === tempStyle.name);
      if (localStyle) {
        if (localStyle?.id !== tempStyle.id) {
          node.fillStyleId = localStyle.id;
        }
      }
    } else if (node.type === 'TEXT' && typeof (node.fillStyleId) === 'symbol') {
        const uniqueTextColorStyles = node.getStyledTextSegments(['fills', 'fillStyleId']);

        for (const fillStyle of uniqueTextColorStyles) {
          //get the style currently applied to the node
          let originalStyle = figma.getStyleById(fillStyle.fillStyleId);

          //apply style if there is a match in local theme
          if (originalStyle !== null) {
            let localStyleObj = localStylesArray.find(elem => elem.name === originalStyle?.name);

            if (localStyleObj) {
              let localStyle = figma.getStyleById(localStyleObj.id);
              node.setRangeFillStyleId(fillStyle.start, fillStyle.end, localStyle?.id);
          }
        }
      }
    } else {
      count++
      addNewNodeToSelection(figma.currentPage, node);
    }
  }
  if ("strokes" in node && node.strokeStyleId !== '') {
    const tempStyle = {id: node.strokeStyleId, name: figma.getStyleById(String(node.strokeStyleId))?.name};
    if (localStylesArray.some(elem => elem.name === tempStyle.name)) {
      let localStyle = localStylesArray.find(elem => elem.name === tempStyle.name);
      if (localStyle) {if (localStyle?.id !== tempStyle.id) {
        node.strokeStyleId = localStyle.id;
      }}
    } else {
      count++
      addNewNodeToSelection(figma.currentPage, node)
    }
  }
}
}

if (selection.length >= 1) {
  iterateSelectionAndReplace()
} else {
  replaceColors(localStylesArray, nodes)
}

if (count) {figma.notify(`Mission complete! 💥 ${count} ${count > 1 ? 'styles were' : 'style was'} not reassigned`)} else {figma.notify(`🙌 Mission complete!`)};}