<script>
  export let group = null;
  export let value = null;
  export let disabled = false;
  export let tabindex = 0;
  export { className as class };

  let uniqueId = "radio--" + (Math.random() * 10000000).toFixed(0).toString();
  let className = "";
  $: checked = group === value;
</script>

<div class={className}>
  <input
    type="radio"
    {value}
    {checked}
    {disabled}
    {tabindex}
    id={uniqueId}
    bind:group
    on:change
    on:focus
  />
  <label for={uniqueId}>
    <slot />
  </label>
</div>

<style>
  div {
    align-items: center;
    cursor: default;
    display: inline-block;
    position: relative;
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    flex-shrink: 0;
  }

  label {
    color: var(--figma-color-text);
    display: flex;
    font-family: var(--font-stack);
    font-size: var(--font-size-xsmall);
    font-weight: var(--font-weight-normal);
    line-height: var(--font-line-height);
    letter-spacing: var(--font-letter-spacing-pos-xsmall);
    padding: var(--size-xxsmall) var(--size-xxsmall) var(--size-xxsmall)
      var(--size-xxsmall);
    user-select: none;
  }
  input:checked + label {
    color: var(--figma-color-bg-brand);
    border-bottom: 2px solid var(--figma-color-bg-brand);
  }
</style>
