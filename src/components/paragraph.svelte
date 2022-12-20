<script>
  export { className as class };
  let className = "";
</script>

<div class={className}>
  <slot />
</div>

<style>
  div {
    font-size: var(--font-size-xsmall);
    font-weight: var(--font-weight-normal);
    line-height: var(--line-height);
    color: var(--figma-color-text-secondary);

    width: 100%;
    align-items: center;
    cursor: default;
    margin-top: calc(var(--size-xxsmall) / 2);
    padding: 0 calc(var(--size-xxsmall) / 2) 0 var(--size-xxsmall);
  }
</style>
