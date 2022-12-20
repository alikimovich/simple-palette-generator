<script context="module">
  export const disclosure = {};
</script>

<script>
  import { getContext, onMount } from "svelte";
  import Icon from "figma-plugin-ds-svelte/src/components/Icon/index.svelte";
  import CaretRight from "figma-plugin-ds-svelte/src/icons/caret-right.svg";
  import CaretDown from "figma-plugin-ds-svelte/src/icons/caret-down.svg";

  export let uniqueId =
    "disclosureItem--" + (Math.random() * 10000000).toFixed(0).toString();
  export let title = null;
  export let expanded = false;
  export let section = false;
  export let open = false;

  const { clickHandler, selected } = getContext(disclosure);

  $: expanded = $selected === uniqueId;

  if (open) {
    selected.set(uniqueId);
  }
</script>

<li {open} {title} id={uniqueId} class:expanded>
  <div class="header" class:section>
    <div class="icon" on:click={clickHandler.bind(null, uniqueId)}>
      {#if expanded}
        <Icon iconName={CaretDown} color="var(--figma-color-text)" />
      {:else}
        <Icon iconName={CaretRight} color="var(--figma-color-text)" />
      {/if}
    </div>
    <div class="title" on:click={clickHandler.bind(null, uniqueId)}>
      {title}
    </div>
  </div>
  <div class="content">
    <slot />
  </div>
</li>

<style>
  li {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style-type: none;
    border-bottom: 1px solid var(--figma-color-border);
  }
  li:last-child {
    border-bottom: 1px solid transparent;
  }

  .header {
    display: flex;
    align-items: center;
    height: var(--size-small);
    font-size: var(--font-size-xsmall);
    font-weight: var(--font-weight-normal);
    letter-spacing: var(--font-letter-spacing-pos-xsmall);
    line-height: var(--line-height);
    color: var(--figma-color-text);
  }
  .header:hover .icon {
    opacity: 0.9;
  }

  .title {
    margin-left: -4px;
    user-select: none;
  }

  .icon {
    margin-left: -4px;
    opacity: 0.3;
  }
  .expanded .icon {
    opacity: 0.8;
  }

  .section {
    font-weight: var(--font-weight-bold);
  }

  .content {
    font-size: var(--font-size-xsmall);
    font-weight: var(--font-weight-normal);
    letter-spacing: var(--font-letter-spacing-pos-xsmall);
    line-height: var(--line-height);
    color: var(--figma-color-text);
    padding: 0 0 var(--size-xxsmall) 0;
    display: none;
  }

  .expanded .content {
    display: block;
  }
</style>
