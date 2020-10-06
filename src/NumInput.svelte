<div>
  <label>
    {label}<br/>
    <input type="number" min={min} step="any" bind:value="{value}" {disabled} on:input={handleInput} />
  </label>
</div>

<script>
  export let label = "";
	export let value = 0;
	export let min = 0;
	export let disabled = false;
	export let allowNegativeValues = false;

	const handleInput = e => {
		if (!allowNegativeValues) {
			value = Math.abs(e.target.value);
		}
  };
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