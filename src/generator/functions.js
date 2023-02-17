import chroma from "chroma-js";

export function generatePalette(primary, secondary, surface, themeMode) {
  let positive, negative, surfaceLow, surfaceMid, surfaceHigh, strokes;
  let primaryLum = chroma(primary).get("oklch.l");

  // Positive and Negative colors
  if (themeMode === "light") {
    if (primaryLum < 0.25) {
      positive = chroma(primary)
        .set("oklch.l", "0.25")
        .set("oklch.c", "0.25")
        .set("oklch.h", "145");
    } else if (primaryLum > 0.4) {
      positive = chroma(primary)
        .set("oklch.l", "0.40")
        .set("oklch.c", "0.25")
        .set("oklch.h", "145");
    } else {
      positive = chroma(primary).set("oklch.h", "145");
    }
    if (chroma(positive).get("oklch.c") < 0.14) {
      positive = chroma(positive).set("oklch.c", "0.14");
    }
    negative = chroma(positive)
      .set("oklch.h", "26")
      .set("oklch.c", "0.225")
      .set("oklch.l", chroma(positive).get("oklch.l"));
  } else {
    if (primaryLum < 0.6) {
      positive = chroma(primary)
        .set("oklch.l", "0.6")
        .set("oklch.c", "0.25")
        .set("oklch.h", "145");
    } else if (primaryLum > 0.8) {
      positive = chroma(primary)
        .set("oklch.l", "0.8")
        .set("oklch.c", "0.25")
        .set("oklch.h", "145");
    } else {
      positive = chroma(primary).set("oklch.h", "145");
    }
    if (chroma(positive).get("oklch.c") < 0.14) {
      positive = chroma(positive).set("oklch.c", "0.14");
    }
    negative = chroma(positive)
      .set("oklch.h", "26")
      .set("oklch.c", "0.225")
      .set("oklch.l", chroma(positive).get("oklch.l"));
  }
  // Secondary
  secondary = secondary
    ? secondary
    : chroma(primary).set("oklch.h", "+45").set("oklch.l", primaryLum);

  // Surface and strokes
  if (themeMode === "light") {
    surfaceLow = surface
      ? chroma(surface).luminance(0.92)
      : chroma(primary).luminance(0.92);

    surfaceMid = chroma(surfaceLow).luminance(0.95).hex();
    surfaceHigh = chroma(surfaceLow).luminance(0.99).hex();
    strokes = chroma(surfaceLow).set("oklch.l", "0.87").hex();
  } else {
    surfaceLow = surface
      ? chroma(surface).luminance(0.01)
      : chroma(primary).luminance(0.01);

    surfaceMid = chroma(surfaceLow).luminance(0.015).hex();
    surfaceHigh = chroma(surfaceLow).luminance(0.018).hex();
    strokes = chroma(surfaceLow).set("oklch.l", "0.30").hex();
  }

  let colorCodes = [
    primary,
    secondary,
    positive,
    negative,
    surfaceLow,
    surfaceMid,
    surfaceHigh,
    strokes,
  ];

  let colorNames = [
    "primary",
    "secondary",
    "positive",
    "negative",
    "surfaceLow",
    "surfaceMid",
    "surfaceHigh",
    "strokes",
  ];

  // Create color Objects with paired text styles
  let colorsArray = [];
  for (const i in colorCodes) {
    const textColor =
      chroma(colorCodes[i]).luminance() < 0.19
        ? "#fafafa"
        : chroma(colorCodes[i]).set("oklch.l", "0.16");

    let contrast = chroma.contrast(colorCodes[i], textColor);
    let contrastAA = contrast < 4.5 ? "❌" : "✅";
    let contrastAAA = contrast < 7 ? "❌" : "✅";

    let color = {
      name: colorNames[i],
      color: chroma(colorCodes[i]).hex(),
      text: textColor,
      contrastAA,
      contrastAAA,
    };
    colorsArray.push(color);
  }

  return colorsArray;
}

export function createCode(colors, noTextColors) {
  let code = [];
  for (const i in colors) {
    let basicColor = {
      name: colors[i].name,
      color: chroma(colors[i].color).rgb(),
    };
    code.push(basicColor);
    if (!noTextColors.some((el) => el === colors[i].name)) {
      let textColor = {
        name: colors[i].name + "-text",
        color: chroma(colors[i].text).rgb(),
      };
      code.push(textColor);
    }
  }
  return code;
}

export function downloadCheck(code, name) {
  let dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(code));
  let anchorNode = document.createElement("a");
  anchorNode.setAttribute("href", dataStr);
  anchorNode.setAttribute("download", name + ".json");
  anchorNode.click();
  anchorNode.remove();
}
