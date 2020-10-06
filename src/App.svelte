<main>
	<section class="container">
		<h1>Income Tax Calculator</h1>
		<br/>
		<div class="incomeContainer">
			<NumInput label="Gross Salary" bind:value={grossSalary} /><b>+</b>
			<NumInput label="Income from Savings account" bind:value={incomeFromSavingsAccount} /><b>+</b>
			<NumInput label="Income from Other sources" bind:value={incomeFromOtherSources} /><b>+</b>
			<NumInput label="Income from House Property" bind:value={incomeFromHouseProperty} min="" allowNegativeValues />
		</div>
		<br/>
		<br/><br/>
		<div class="exemptionsContainer"><b>-</b>
			<NumInput label="Standard deduction" value={standardDeduction} disabled /><b>-</b>
			<NumInput label="Entertainment allowance" bind:value={entertainmentAllowance} /><b>-</b>
			<NumInput label="Professional tax" bind:value={professionalTax} /><b>-</b>
			<div>
				<NumInput label="HRA Exemption" bind:value={hraExemption} />
				<button on:click={() => dialog.open()}>Calculate HRA Exemption</button>
			</div>
		</div>
	
		<br/>
		<p>
			<b>Gross total income in Old Regime</b>
			({number(grossSalary)} + {number(incomeFromSavingsAccount)} + {number(incomeFromOtherSources)} + {number(incomeFromHouseProperty)} - {number(standardDeduction)} - {number(entertainmentAllowance)} - {number(professionalTax)} - {number(hraExemption)}) = 
				<b>{numFormatterWithDec.format(grossTotalIncomeUnderOldRegime >= 0 ? grossTotalIncomeUnderOldRegime : 0)}</b>
		</p>
										
		<p>
			<b>Gross total income in New Regime</b>
			({number(grossSalary)} + {number(incomeFromSavingsAccount)} + {number(incomeFromOtherSources)} + {number(incomeFromHouseProperty)}) = 
			<b>{numFormatterWithDec.format(grossTotalIncomeUnderNewRegime >= 0 ? grossTotalIncomeUnderNewRegime : 0)}</b>
		</p>

		<br/><br/>
		<div class="deductionsContainer"><b>-</b>
			<NumInput label="Deductions under 80C" bind:value={deduction80C} /><b>-</b>
			<NumInput label="Deductions under 80D" bind:value={deduction80D} /><b>-</b>
			<NumInput label="Deductions under 80TTA" bind:value={deduction80TTA} disabled /><b>-</b>
			<NumInput label="Other Deductions: 80CCF, 80G, 80E, etc." bind:value={otherDeductions} />
		</div>

		<br/>
		<p>
			<b>Net taxable income in Old Regime</b>
			({grossTotalIncomeUnderOldRegime >= 0 ? grossTotalIncomeUnderOldRegime : 0} - {Math.min(150000, number(deduction80C))} - 
			 {Math.min(100000, number(deduction80D))} - {deduction80TTA} - {number(otherDeductions)}) = 
			<b>{numFormatterWithDec.format(netTaxableIncomeUnderOldRegime >= 0 ? netTaxableIncomeUnderOldRegime : 0)}</b>
		</p>

		<p>
			<b>Net taxable income in New Regime = 
				{numFormatterWithDec.format(grossTotalIncomeUnderNewRegime >= 0 ? grossTotalIncomeUnderNewRegime : 0)}
			</b>
		</p>

		<h5 class="disclaimer"><strong>Disclaimer:</strong> This tax calculator works under certain assumptions. Thus, your actual tax liability may be different. Readers are advised to seek appropriate professional advice.</h5>
	</section>

	<div class="divider"></div>

	<section>
		<h2>Income Tax Slabs</h2>
		<table id="taxRatesContainer">
			<thead>
        <tr>
					<th>Tax Slabs</th>
					<th>Old Rate</th>
					<th>New Rate</th>
        </tr>
			</thead>
			<tbody>
				<tr>
					<td>Upto ₹ 2.5 Lakhs</td>
					<td>0</td>
					<td>0</td>
				</tr>
				<tr>
					<td>₹ 2.5 Lakhs - ₹ 5 Lakhs</td>
					<td>5%</td>
					<td>5%</td>
				</tr>
				<tr>
					<td>₹ 5 Lakhs - ₹ 7.5 Lakhs</td>
					<td>20%</td>
					<td>10%</td>
				</tr>
				<tr>
					<td>₹ 7.5 Lakhs - ₹ 10 Lakhs</td>
					<td>20%</td>
					<td>15%</td>
				</tr>
				<tr>
					<td>₹ 10 Lakhs - ₹ 12.5 Lakhs</td>
					<td>30%</td>
					<td>20%</td>
				</tr>
				<tr>
					<td>₹ 12.5 Lakhs - ₹ 15 Lakhs</td>
					<td>30%</td>
					<td>25%</td>
				</tr>
				<tr>
					<td>&gt; ₹ 15 Lakhs</td>
					<td>30%</td>
					<td>30%</td>
				</tr>
			</tbody>
		</table>

		<h4 class="text-secondary">Around 70 exemptions and deductions would be removed under the new simplified income tax regime which inlcudes, but is not limited to: 
			<ul>
				<li>House Rent Allowance</li>
				<li>Leave Travel Concession</li>
				<li>Standard deduction on Salary</li>
				<li>Deduction of professional tax</li>
				<li>Deduction u/s 80C (life insurance etc.)</li>
				<li>80CCD(1B) (your contribution to NPS up to INR 50,000)</li>
				<li>80D (Medical insurance)</li>
				<li>80E (interest on education loan) etc.</li>
			</ul>
		</h4>
	</section>

	<div class="taxPayableContainer">
		<table>
			<thead>
        <tr>
					<th>Tax in Old regime <br/>(including cess)</th>
					<td></td>
					<th>Tax in New regime <br/>(including cess)</th>
					<td></td>
					<th>Savings {taxPayableUnderOldRegime == taxPayableUnderNewRegime ? '' : taxPayableUnderOldRegime <= taxPayableUnderNewRegime ? 'in Old regime' : 'in New regime'}</th>
        </tr>
    	</thead>
			<tr>
				<td>{numFormatter.format(taxPayableUnderOldRegime)}</td>
				<td>-</td>
				<td>{numFormatter.format(taxPayableUnderNewRegime)}</td>
				<td>=</td>
				<td>{numFormatter.format(Math.abs(taxPayableUnderOldRegime - taxPayableUnderNewRegime))}</td>
			</tr>
		</table>
	</div>

	<Dialog
		bind:this={dialog}
		aria-labelledby="dialog-title"
		aria-describedby="dialog-content">
		<Title id="dialog-title">HRA Exemption Calculator</Title>
		<Content id="dialog-content">
			<NumInput label="Basic Salary (Annual)" bind:value={basicSalary} /><br/>
			<NumInput label="Dearness allowance" bind:value={dearanceAllowance} /><br/>
			<NumInput label="HRA received" bind:value={hraReceived} /><br/>
			<NumInput label="Actual rent paid" bind:value={actualRentPaid} /><br/>
			
			<p>Do you live in a metro (Delhi, Mumbai, Chennal or Kolkata)?</p>
			<input type="radio" id="yes" bind:group={cityMultiplier} value={0.5}>
			<label for="yes">Yes</label><br>
			<input type="radio" id="no" bind:group={cityMultiplier} value={0.4}>
			<label for="no">No</label><br>			
		</Content>
		<Actions>
			<button on:click={() => dialog.close()}>Cancel</button>
			<button on:click={() => calculateHRAExemption()}>Calculate</button>
		</Actions>
	</Dialog>
</main>

<script>
	import Dialog, {Title, Content, Actions} from '@smui/dialog';
	import getTaxPayable from './taxCalculator.js'
	import NumInput from './NumInput.svelte';

	const NEW_TAX_REGIME = 0;
	const OLD_TAX_REGIME = 1;

	let grossSalary = 0;
	let incomeFromOtherSources = 0;
	let incomeFromSavingsAccount = 0;
	const standardDeduction = 50000;
	let professionalTax = 0;
	let hraExemption = 0;
	let entertainmentAllowance = 0;
	let incomeFromHouseProperty = 0;
	let deduction80C = 0;
	let deduction80D = 0;
	let otherDeductions = 0;

	let dialog;
	let basicSalary = 0;
	let dearanceAllowance = 0;
	let hraReceived = 0;
	let actualRentPaid = 0;
	let cityMultiplier = 0.5;

	$: rentLess10PercSalary = number(actualRentPaid) - 0.1 * (number(basicSalary) + number(dearanceAllowance));
	$: calculatedHRAExemption = Math.min(number(cityMultiplier) * number(basicSalary), number(hraReceived), rentLess10PercSalary < 0 ? 0 : rentLess10PercSalary);
	$: deduction80TTA = Math.min(10000, number(incomeFromSavingsAccount));
	$: grossTotalIncomeUnderOldRegime = number(grossSalary) + number(incomeFromOtherSources) + number(incomeFromSavingsAccount) 
																			- number(standardDeduction) - number(entertainmentAllowance) - number(professionalTax)
																			- number(hraExemption) + number(incomeFromHouseProperty);
	$: grossTotalIncomeUnderNewRegime = number(grossSalary) + number(incomeFromOtherSources) + number(incomeFromSavingsAccount)
																			+ number(incomeFromHouseProperty);
	$: netTaxableIncomeUnderOldRegime = grossTotalIncomeUnderOldRegime - Math.min(150000, number(deduction80C)) - 
																			Math.min(100000, number(deduction80D)) - deduction80TTA - number(otherDeductions);
	$: taxPayableUnderOldRegime = getTaxPayable(netTaxableIncomeUnderOldRegime, OLD_TAX_REGIME);
	$: taxPayableUnderNewRegime = getTaxPayable(grossTotalIncomeUnderNewRegime, NEW_TAX_REGIME);

	const numFormatter = new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR',
		minimumFractionDigits: 0
	});

	const numFormatterWithDec = new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR',
		minimumFractionDigits: 2
	});

	function calculateHRAExemption() {
		hraExemption = calculatedHRAExemption;
		dialog.close();
	}

	function number(val) { return isNaN(val) ? 0 : val; }
</script>

<style>
	* {
		font-family: 'Inter';
	}

	main, section {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 10px 10px 0;
	}

	main {
		margin-bottom: 100px;
	}

	.container>p>b, .container>div>b {
		padding: 10px;
	}

	.container>div>b {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	h1, .container>p {
		text-align: center;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px 10px 10px 10px;
	}

	.incomeContainer,.exemptionsContainer,.deductionsContainer {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	button {
		background-color: transparent;
		margin: 5px 5px 0 0;
		font-weight: bold;
		padding: 10px;
		border-radius: 5px;
		border: 0.5px solid #c2c2c2;
		color: #2a6e2e;
		cursor:pointer;
		text-transform: uppercase;
	}

	.taxPayableContainer {
		display: flex;
		justify-content: center;
		position: fixed;
		bottom: 0;
		padding: 10px 0 0 0;
		background-color: white;
		border-radius: 10px 10px 0 0;
		border: 1px solid white;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	th, td {
		text-align: center;
		padding: 0.5rem;
	}

	.disclaimer, .text-secondary {
		font-weight: 300;
	}

	.divider {
		width: 100%;
		height: 1px;
		background-color: #757575;
	}

	#taxRatesContainer {
		border-collapse: collapse;
		width: 100%;
	}

	#taxRatesContainer td, #taxRatesContainer th {
		border: 1px solid #ddd;
		padding: 8px;
	}

	#taxRatesContainer tr:nth-child(even){background-color: #f2f2f2;}

	#taxRatesContainer th {
		padding-top: 12px;
		padding-bottom: 12px;
		background-color: #388E3C;
		color: white;
	}

	@media only screen and (min-width: 300px) and (max-width: 1300px) {
    .incomeContainer>b, .exemptionsContainer>b, .deductionsContainer>b {
			text-align: center;
			width: 100%;
		}
  }

	@media only screen and (min-width: 1200px) {
		.taxPayableContainer {
			width: 40%;
		}
	}

	@media only screen and (max-width: 600px) {
		th {
			padding: 0.1rem;
			font-size: 0.8rem;
		}
	}

	* :global(#dialog-content>label) {
		width: 100%;
	}

	* :global(.mdc-dialog .mdc-dialog__content) {
		color: black;
	}
</style>