const tipValuesContainer = document.getElementById("tip-values");
const custom = document.querySelector(".tip-custom");
const tipAmount = document.getElementById("tip-amount");
const billTotal = document.getElementById("total-amount");
const totalPeople = document.getElementById("total-people");
const totalAmountPp = document.getElementById("total-per-person");
const reset = document.getElementById("reset-btn");
const error = document.getElementById("error");

custom.addEventListener("click", (e) => {
  console.log(e.target.value);
});

let selectedElement = null;

function tipCalculator() {
  tipValuesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("tip-value")) {
      const tips = parseInt(e.target.value);
      const tipPerPerson = tips / totalPeople.value;
      const roundedOffTipPp = parseFloat(tipPerPerson.toFixed(2));
      tipAmount.textContent = `$${roundedOffTipPp}`;

      const clickedElement = e.target;

      // Reset the background color of the previously selected element
      if (selectedElement) {
        selectedElement.style.backgroundColor = "hsl(183, 100%, 15%)";
      }

      // Set the background color of the clicked element
      clickedElement.style.backgroundColor = "hsl(172, 67%, 45%)";

      selectedElement = clickedElement; //tracking the selected element

      if (billTotal.value === "" && totalPeople.value === "") {
        totalAmountPp.textContent = `$${0.0}`;
      } else {
        const totalPerPerson = Math.round(billTotal.value / totalPeople.value);
        totalAmountPp.textContent = `$${
          totalPerPerson * (tips / 100) + totalPerPerson
        }`;
        reset.style.opacity = 1;
      }
      if (totalPeople.value === 0 || totalPeople.value === "") {
        error.innerHTML = `Can't be 0`;
        totalPeople.style.border = "1px";
        totalPeople.style.borderStyle = "solid";
        totalPeople.style.borderColor = "red";
        totalAmountPp.textContent = `$${0}`;
        tipAmount.textContent = `$${0}`;
        reset.style.opacity = ".2";
        // reset.disabled = true;
      } else {
        error.innerHTML = "";
        totalPeople.style.border = "none";
      }
    }
  });
}

//Reseting all values to default
function resetValues() {
  tipAmount.textContent = "$0";
  totalAmountPp.textContent = "$0";
  billTotal.value = "";
  totalPeople.value = "";
  reset.style.opacity = ".2";
}

reset.addEventListener("click", resetValues);
tipCalculator();
