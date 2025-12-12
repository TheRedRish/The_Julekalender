<script>
  let { label, empty = false } = $props();
</script>

<div class="ui-avatar {empty ? 'ui-avatar--empty' : ''}">
  {label}
</div>

<style>
  .ui-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #8b0016;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
  }

  .ui-avatar--empty {
    background: #ddd;
    color: #777;
  }
</style>
