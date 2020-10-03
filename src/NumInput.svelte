<div>
  <label>
    {label}<br/>
    <input type="number" min={min} step="any" bind:value="{value}" {disabled} />
  </label>
</div>

<script>
  export let label = "";
	export let value = 0;
	export let min = 0;
	export let disabled = false;
</script>

<style>
  label {
		font-size: 0.85rem;;
	}

	input {
		font-size: 1rem;
		padding: 12px;
	}

	input:focus {
		outline: none;
		border-style: solid;
		border-color: #388E3C;
		border-radius: 5px;
	}
</style>