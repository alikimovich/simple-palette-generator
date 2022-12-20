<script>
  import { onMount } from "svelte";
  import Additional from "./sections/additional.svelte";
  import Main from "./sections/main.svelte";
  import { Tabs } from "./components/components";

  // tabs
  let currentTab = "Main";
</script>

<div class="tabs-list">
  <Tabs bind:group={currentTab} value="Main">Generator</Tabs>
  <Tabs bind:group={currentTab} value="Additional">Additional</Tabs>
</div>

<Main display={currentTab === "Main" ? true : false} />
<Additional display={currentTab === "Additional" ? true : false} />

<style>
  .tabs-list {
    width: 100%;
    margin: 0;
    display: block;
    border-bottom: 1px solid var(--figma-color-border);
  }
</style>
