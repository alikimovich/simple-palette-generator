<script>
  export let display = false;
  import { onMount } from "svelte";
  import { GlobalCSS } from "figma-plugin-ds-svelte";
  //import some Svelte Figma UI components
  import { Label, Section, Radio } from "figma-plugin-ds-svelte";
  import {
    Button,
    Colorpicker,
    Disclosure,
    DisclosureItem,
  } from "./../components/components";

  //import color tools
  import chroma from "chroma-js";
  import "@melloware/coloris/dist/coloris.css";
  import { coloris, init } from "@melloware/coloris";
  init();
  coloris({
    theme: "default",
    alpha: false,
    themeMode: "auto",
    format: "hex",
  });

  //import custom functions
  import { generatePalette, createCode } from "./../generator/functions";

  //colors
  let themeMode = "light";
  let primary = "#2366a1";
  let secondary;
  let surface;
  let colorList = [];
  let noTextColors = ["surfaceMid", "surfaceHigh", "strokes"];

  //local functions
  function update() {
    colorList = generatePalette(primary, secondary, surface, themeMode);
  }
  function clear() {
    colorList = [];
    primary = "#AA00FF";
    secondary = "";
    surface = "";
  }

  //messenger
  function pushPalette(colors) {
    const palette = createCode(colors, noTextColors);
    parent.postMessage(
      { pluginMessage: { type: "pushPalette", palette } },
      "*"
    );
  }

  //on start
  update();
</script>

<div style="display:{display ? 'inherit' : 'none'}">
  <div class="wrapper p-xxsmall">
    <div class="grid">
      <div class="col">
        <!-- //Primary color -->
        <Section>Primary color</Section>
        <Colorpicker on:change={update} bind:value={primary} />
      </div>
      <div class="col">
        <Section>Theme Mode</Section>
        <div class="grid">
          <Radio bind:group={themeMode} on:change={update} value="light">
            Light
          </Radio>
          <Radio bind:group={themeMode} on:change={update} value="dark">
            Dark
          </Radio>
        </div>
      </div>
    </div>
    <Disclosure>
      <DisclosureItem title="Custom">
        <div class="grid">
          <!-- //Secondary color -->
          <div class="col">
            <Label>Secondary</Label>
            <Colorpicker on:change={update} bind:value={secondary} />
          </div>
          <div class="col">
            <!-- //Surface color -->
            <Label>Surface</Label>
            <Colorpicker on:change={update} bind:value={surface} />
          </div>
        </div>
      </DisclosureItem>
    </Disclosure>
  </div>

  {#if colorList.length}
    <div class="palette pl-xxsmall pr-xxsmall">
      {#each colorList as color}
        <div style="background-color: {color.color}; color: {color.text};">
          {color.name}, {color.color}<br />{color.contrastAA} AA,
          {color.contrastAAA}
          AAA
        </div>
      {/each}
    </div>
  {/if}
  <div class="p-xxsmall">
    <Button on:click={pushPalette(colorList)} class="full-width">
      Push to Figma
    </Button>
  </div>
  <div class="p-xxsmall">
    {#if colorList.length}
      <Button on:click={clear} variant="tertiary" class="full-width" destructive
        >Clear</Button
      >
    {:else}
      <Button on:click={update} variant="tertiary" class="full-width"
        >Generate</Button
      >
    {/if}
  </div>
</div>

<style>
  .palette {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-auto-flow: row;
    gap: 0.05em;
  }
  .palette div {
    padding: 0.5em;
    width: 100%;
    font-size: var(--font-size-xsmall);
  }
  .grid {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-auto-flow: row;
  }
  .right {
    right: 0;
    float: right;
  }
</style>
