<span data-id={dataId} class="tooltip">{value}
  <span class="tooltiptext" aria-hidden="true">{label}</span>
</span>

<script>
  export let value = 0;
  export let label = "";
  export let dataId = "";
</script>

<style>
  .tooltip {
		position: relative;
		display: inline-block;
		border-bottom: 1px dotted black;
	}

	.tooltip .tooltiptext {
		visibility: hidden;
		width: 150px;
		background-color: black;
		color: #fff;
		text-align: center;
		padding: 5px;
		border-radius: 6px;
		bottom: 100%;
		left: 50%;
    margin-left: -80px;
	
		position: absolute;
		z-index: 1;
	}

	.tooltip:hover .tooltiptext {
		visibility: visible;
	}

  .tooltip .tooltiptext::after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
</style>