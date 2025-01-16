//Array to hold lens instances
const lenses = [];

//Counters to use as id
let lensIdCounter = 0;

//Lens class
class Lens {
  constructor(brand, model, sensorSize, focalLength, aperture, lensMount) {
    this.id = lensIdCounter++;
    this.brand = brand;
    this.model = model;
    this.sensorSize = sensorSize;
    this.focalLength = focalLength;
    this.aperture = aperture;
    this.lensMount = lensMount;
  }
}

//Add a new Lens
function addLens(lens) {
  const lensTableBody = document.querySelector("#lensTable tbody");
  const row = document.createElement("tr"); // each Lens will be 1 table row
  row.setAttribute("data-lens-id", lens.id);
  row.innerHTML = `
            <td>${lens.brand} ${lens.model}</td>
            <td>${lens.focalLength} mm</td>
            <td>F/${lens.aperture}</td>
            <td>${lens.sensorSize}</td>
            <td>${lens.lensMount}</td>
            <td>
                <button onclick="fillEditLens(${lens.id}); scrollToForm();">Edit</button>

                <button>Delete</button>
            </td>
        `;
  lensTableBody.appendChild(row);
  fillInventory();
}

function deleteLens(idToRemove) {
  const indexToRemove = lenses.findIndex((obj) => obj.id === idToRemove);
  if (indexToRemove > -1) {
    //-1 means not found
    lenses.splice(indexToRemove, 1); //splice = delete an object at Array Index (indexToRemove)
  }
  //Update the number of Lenses in the Dashboard Icon
  updateDashboard();
  saveToLocalStorage();
}

//Edit an existing Lens
function fillEditLens(lensId) {
  const lensToEdit = lenses.find((lens) => lens.id === lensId);

  if (lensToEdit) {
    document.getElementById("type").value = "lens"; //Set type to lens
    updateDynamicFields(); //Call to update fields based on type

    //Fill the forms fields with the objects data
    document.getElementById("lensId").value = lensToEdit.id;

    document.getElementById("lensBrand").value = lensToEdit.brand;
    document.getElementById("lensModel").value = lensToEdit.model;
    document.getElementById("lensSensorSize").value = lensToEdit.sensorSize;
    document.getElementById("focalLength").value = lensToEdit.focalLength;
    document.getElementById("aperture").value = lensToEdit.aperture;
    document.getElementById("mountingSystem").value = lensToEdit.lensMount;

    enterEditMode();
  }
  scrollToForm();
}

