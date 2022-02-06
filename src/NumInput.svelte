<div>
  <label>
    {label}<br/>
    <input data-id={dataId} type="number" min={min} step="any" enterkeyhint="next" on:keydown={handleKeyDown} bind:value="{value}" {disabled} on:input={handleInput} on:focus={selectAll} />
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
			e.target.validity.valid || (value = '');
		}
	};

	const handleKeyDown = e => {
		if (e.which == 13) {
			e.preventDefault();
			var inputs = Array.from(document.getElementsByTagName('input'));
			const currentElementIndex = inputs.findIndex(input => input.attributes['data-id'] && input.attributes['data-id'].value == document.activeElement.attributes['data-id'].value);
			if (!inputs[currentElementIndex + 1]) return;
			
			if (!inputs[currentElementIndex + 1].disabled) {
				inputs[currentElementIndex + 1].focus();
			} else {
				let nextIndex = currentElementIndex + 2;
				while(inputs[nextIndex] && inputs[nextIndex].disabled) {
					nextIndex += 1;
				}
				if (inputs[nextIndex]) { inputs[nextIndex].focus(); }
			}
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