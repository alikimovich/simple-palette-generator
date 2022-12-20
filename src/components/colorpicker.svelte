<script>
  import Paragraph from "./paragraph.svelte";
  import { compute_slots } from "svelte/internal";
  export let id = null;
  export let value = null;
  export let name = null;
  export let disabled = false;
  export { className as class };
  let className = "";
  let disabledClassName = "disabled";

  $: if (disabled) {
    disabledClassName = "disabled";
  } else {
    disabledClassName = "";
  }
</script>

<div class="input {className} {disabledClassName}">
  <input
    type="text"
    data-coloris
    on:input
    on:change
    on:keydown
    on:focus
    on:blur
    bind:value
    {id}
    {name}
    {disabled}
  />
  {#if !disabled && $$slots.comments}
    <Paragraph>
      <slot name="comments" />
    </Paragraph>
  {/if}
</div>

<style>
  .input {
    position: relative;
    transition: flex 0s 0.2s;
  }

  input {
    font-size: var(--font-size-xsmall);
    font-weight: var(--font-weight-normal);
    letter-spacing: var(--font-letter-spacing-neg-xsmall);
    line-height: var(--line-height);
    position: relative;
    display: flex;
    overflow: visible;
    align-items: center;
    width: 100px;
    height: 30px;
    margin: 0px 0px 0px var(--size-xxsmall);
    padding: var(--size-xxsmall) 0px var(--size-xxsmall) var(--size-xxsmall);
    color: var(--figma-color-text);
    border: 1px solid var(--figma-color-border);
    border-radius: var(--border-radius-small);
    outline: none;
    background-color: transparent;
  }
  input:hover {
    color: var(--figma-color-text-hover);
    border: 1px solid var(--figma-color-border);
    background-image: none;
  }
  input::selection {
    color: var(--figma-color-text);
    background-color: var(--text-highlight);
  }
  input:active,
  input:focus {
    color: var(--figma-color-text);
    border: 1px solid var(--figma-color-border-selected);
    outline: 1px solid var(--figma-color-border-selected);
    outline-offset: -2px;
  }
  input:disabled,
  .disabled {
    display: none;
  }
  .borders {
    border: 1px solid var(--figma-color-border);
    background-image: none;
  }

  .indent {
    padding-left: 32px;
  }
  .p {
    font-size: var(--font-size-xsmall);
    font-weight: var(--font-weight-normal);
    line-height: var(--line-height);
    color: var(--figma-color-text-secondary);
    height: var(--size-medium);
    width: 100%;
    align-items: center;
    cursor: default;
    margin-top: calc(var(--size-xxsmall) / 2);
    padding: 0 calc(var(--size-xxsmall) / 2) 0 var(--size-xxsmall);
  }
</style>
