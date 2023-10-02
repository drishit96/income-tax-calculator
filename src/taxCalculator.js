const newRegimeTaxAmts = [0, 15000, 30000, 45000, 60000];
const oldRegimeTaxAmts = [0, 12500, 50000, 50000, 75000, 75000];

function getTaxPayable(netTaxableIncome, taxRegime) {
  if (taxRegime === 0) return getTaxPayableForNewRegime(netTaxableIncome);
  return getTaxPayableForOldRegime(netTaxableIncome);
}

function getTaxPayableForOldRegime(netTaxableIncome) {
  const taxAmts = oldRegimeTaxAmts;
  let taxPayable = 0;
  if (netTaxableIncome <= 500000) { return 0; }
  else {
    let d = netTaxableIncome / 250000;
    let excessAmt = 0;
    if (d > 6) {
      excessAmt = netTaxableIncome - 1500000;
      d = 6;
    }

    const dfloor = Math.floor(d);
    for(let i = 0; i < dfloor; i++) {
      taxPayable += taxAmts[i];
    }

    if (d < 6 && dfloor > 0) {
      taxPayable += (d - dfloor) * taxAmts[dfloor];
    }

    taxPayable += excessAmt * 0.3;
  }

  return Math.round(taxPayable * 1.04);
}

function getTaxPayableForNewRegime(netTaxableIncome) {
  const taxAmts = newRegimeTaxAmts;
  let taxPayable = 0;
  if (netTaxableIncome <= 700000) { return 0; }
  else {
    let d = netTaxableIncome / 300000;
    let excessAmt = 0;
    if (d > 5) {
      excessAmt = netTaxableIncome - 1500000;
      d = 5;
    }

    const dfloor = Math.floor(d);
    for(let i = 0; i < dfloor; i++) {
      taxPayable += taxAmts[i];
    }

    if (d < 5 && dfloor > 0) {
      taxPayable += (d - dfloor) * taxAmts[dfloor];
    }

    taxPayable += excessAmt * 0.3;
  }

  return Math.round(taxPayable * 1.04);
}

module.exports = getTaxPayable;