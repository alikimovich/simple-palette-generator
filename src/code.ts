import { pushPalette } from "./plugin/palette";
import { slugify } from "./plugin/misc";
import { applyLocalStyles } from "./plugin/applylocalstyles";

figma.showUI(__html__, {themeColors: true, width: 270, height: 360});

figma.ui.onmessage = msg => {
	switch (msg.type) {
		case 'pushPalette':
			pushPalette(msg);
			break;
		case 'exportCurrentTheme':
			const styles = figma.getLocalPaintStyles();
			let exportStyles = [];
			for (var i in styles) {
			  if (styles[i].paints[0].type === 'SOLID') {
				let r =  Math.round(styles[i].paints[0].color.r * 1000)/1000;
				let g =  Math.round(styles[i].paints[0].color.g * 1000)/1000;
				let b =  Math.round(styles[i].paints[0].color.b * 1000)/1000;
				let name = styles[i].name.replace(' Light','');
				name = name.replace('&', 'and')
				name = name.split('/')[1];
				let exportStyle = {name, color: [r,g,b], alpha: styles[i].paints[0].opacity}
				exportStyles.push(exportStyle); 
			  }
			}
			let themeName = slugify(figma.root.name) + '-colors';
			figma.ui.postMessage({ pluginMessage: { type: "export", exportStyles, themeName } });
			break;
		case 'applyLocalStyles':
			applyLocalStyles();
			break;
	}
};
