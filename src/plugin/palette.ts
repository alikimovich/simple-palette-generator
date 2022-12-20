//utilities
function convertRgb(color) {
  let i = 0;
  let convertedColors = {
    0: Math.round((parseInt(color[0]) / 255) * 1000) / 1000,
    1: Math.round((parseInt(color[1]) / 255) * 1000) / 1000,
    2: Math.round((parseInt(color[2]) / 255) * 1000) / 1000,
  };
  return convertedColors;
}

//pushes palette from the plugin to figma file
export function pushPalette(msg) {

  //get local styles
  const nodes: SceneNode[] = [];
  const styles = figma.getLocalPaintStyles();

  //simplfy local styles
  let localStyles = [];
  localStyles = styles.map(({ id, name }) => ({ id, name }));

  //new styles
  let newStyles = msg.palette;

  for (var i in newStyles) {
    
    let color = convertRgb(newStyles[i].color)
    let newColor = { r: color[0], g: color[1], b: color[2] };
    
    if (localStyles.some(el => el.name === newStyles[i].name)) {
      let styleId = localStyles.find(el => el.name === newStyles[i].name);
      if (styleId) {
        let rewrittenStyle = figma.getStyleById(styleId.id) as PaintStyle;
        rewrittenStyle.paints = [{ type: 'SOLID', color: newColor, opacity: 1 }];
      }
    } else {
      const style = figma.createPaintStyle();
      style.name = newStyles[i].name;
      style.paints = [{ type: 'SOLID', color: newColor, opacity: 1 }];
    }
  }
  figma.notify("✅ Styles are successfully updated!");
}