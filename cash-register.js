let currencyUnitLookUp = {
  PENNY: 1,
  NICKEL: 5,
  DIME: 10,
  QUARTER: 25,
  ONE: 100,
  FIVE: 500,
  TEN: 1000,
  TWENTY: 2000,
  "ONE HUNDRED": 10000,
};

//Currency used within this function is converted to its cent equivelant

function checkCashRegister(price, cash, cid) {
  //Calculate the amount of change required in cents
  let change = (cash - price) * 100;

  //Calculate the total amount of money within the cash register in cents
  let cashInDrawer = 0;
  cid.forEach((element) => {
    cashInDrawer += Math.round(element[1] * 100);
  });
  cashInDrawer = Math.round(cashInDrawer);

  if (cashInDrawer == change) {
    return { status: "CLOSED", change: cid };
  }

  //Change array used in returned object
  let changeArray = [];

  //Loop through register from highest to lowest
  //Provide the change as required
  //Currency values are in cents
  for (let i = cid.length - 1; i > -1; i--) {
    // Find the required amount of units for the change for a given unit of currency
    let requiredUntis = change / currencyUnitLookUp[cid[i][0]];

    if (requiredUntis >= 1) {
      // Calculate the available multiple of a given unit of currency which is in the cash register
      let availableUnits = Math.round(cid[i][1] * 100) / currencyUnitLookUp[cid[i][0]];

      // Use all of a given currency unit for change
      if (availableUnits <= requiredUntis) {
        changeArray.push([cid[i][0], (currencyUnitLookUp[cid[i][0]] * availableUnits) / 100]);
        change = change - currencyUnitLookUp[cid[i][0]] * availableUnits;
      }

      // Use the required amount of a currency unit when more currency is available for a given currency unit
      if (availableUnits >= requiredUntis && availableUnits - Math.floor(requiredUntis) >= 0) {
        changeArray.push([cid[i][0], (currencyUnitLookUp[cid[i][0]] * Math.floor(requiredUntis)) / 100]);
        change = change - currencyUnitLookUp[cid[i][0]] * Math.floor(requiredUntis);
      }
    }
  }

  if (cashInDrawer < change || change != 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: changeArray };
}
