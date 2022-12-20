<script>
  export let display = false;
  import { onMount } from "svelte";
  import { GlobalCSS } from "figma-plugin-ds-svelte";
  //import some Svelte Figma UI components
  import { Button, Label, Section } from "figma-plugin-ds-svelte";
  import { downloadCheck } from "../generator/functions";
  import { Paragraph } from "../components/components";

  function ask(message) {
    parent.postMessage({ pluginMessage: { type: message } }, "*");
  }
  window.onmessage = async (event) => {
    const message = await event.data.pluginMessage;
    if (message.pluginMessage.type === "export") {
      const exportCode = message.pluginMessage.exportStyles;
      const themeName = message.pluginMessage.themeName;
      downloadCheck(exportCode, themeName);
    }
  };
</script>

<div style="display:{display ? 'inherit' : 'none'}">
  <!-- // EXPORT A THEME TO JSON FILE -->
  <div class="wrapper p-xxsmall">
    <Section>Export</Section>
    <Label>
      Here you can export current styles from the Figma file to your computer
    </Label>
    <div class="p-xxsmall">
      <Button on:click={() => ask("exportCurrentTheme")} variant="secondary">
        Export current theme
      </Button>
    </div>
  </div>

  <!-- //APPLY LOCAL STYLES -->
  <div class="wrapper p-xxsmall">
    <Section>Apply Styles</Section>
    <Paragraph>
      This tiny tool scans all the elements on the page, and collects assigned
      styles. All styles that are named the same way as styles in the current
      file then reassignes to the paired styles.
    </Paragraph>
    <div class="p-xxsmall">
      <Button on:click={() => ask("applyLocalStyles")} variant="secondary">
        Apply Local Styles
      </Button>
    </div>
  </div>
</div>

<style>
</style>
