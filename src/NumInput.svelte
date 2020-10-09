<div>
  <label>
    {label}<br/>
    <input data-id={dataId} type="number" min={min} step="any" bind:value="{value}" {disabled} on:input={handleInput} on:focus={selectAll} />
  </label>
</div>

<script>
	export let dataId = "";
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
	
	const selectAll = function() {
		this.select();
	}
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