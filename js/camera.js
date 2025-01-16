//Array to hold camera instances
const cameras = [];

//Counters to use as id
let cameraIdCounter = 0;

//Camera class
class Camera {
  constructor(technology, brand, model, sensorSize, megapixels, lensMount) {
    this.id = cameraIdCounter++;
    this.technology = technology;
    this.brand = brand;
    this.model = model;
    this.sensorSize = sensorSize;
    this.megapixels = megapixels;
    this.lensMount = lensMount;
  }
}

//Add a new Camera
function addCamera(camera) {
  const cameraTableBody = document.querySelector("#cameraTable tbody");
  const row = document.createElement("tr"); // each Camera will be 1 table row
  row.setAttribute("data-camera-id", camera.id);
  row.innerHTML = `
            <td>${camera.brand} ${camera.model}</td>
            <td>${camera.technology}</td>
            <td>${camera.sensorSize}</td>
            <td>${camera.megapixels}</td>
            <td>${camera.lensMount}</td>
        
            <td>
                <button onclick="fillEditCamera(${camera.id}); scrollToForm();">Edit</button>
                <button>Delete</button>
            </td>
        `;
  cameraTableBody.appendChild(row);
  fillInventory();
}

//Delete function
function deleteCamera(idToRemove) {
  const indexToRemove = cameras.findIndex((obj) => obj.id === idToRemove);
  if (indexToRemove > -1) {
    //-1 means not found
    cameras.splice(indexToRemove, 1); //Splice = delete an object at Array Index (indexToRemove)
  }
  //Update the number of Lenses in the Dashboard Icon
  updateDashboard();
  saveToLocalStorage();
}

//Edit and existing Camera
function fillEditCamera(cameraId) {
  /* array.find() = take each id attribute (camera.id) of the objects (camera) in the array 
    and compare them to (cameraId). If you find a matching id the save that object in
    the cameraToEdit variable */
  const cameraToEdit = cameras.find((camera) => camera.id === cameraId);

  if (cameraToEdit) {
    //If a camera with the same Id is found in the Array and the variable has an object saved

    //document.getElementById("type").value = "camera"; // Set type to camera
    type.value = "camera"; // Das HTML obijekt kann auch direkt über die ID angesprochen werden
    updateDynamicFields(); // Call to update fields based on type

    //Fill the forms fields with the objects data
    document.getElementById("cameraId").value = cameraToEdit.id;

    document.getElementById("technology").value = cameraToEdit.technology;
    document.getElementById("cameraBrand").value = cameraToEdit.brand;
    document.getElementById("cameraModel").value = cameraToEdit.model;
    document.getElementById("cameraSensorSize").value = cameraToEdit.sensorSize;
    document.getElementById("megapixels").value = cameraToEdit.megapixels;
    document.getElementById("lensMount").value = cameraToEdit.lensMount;

    enterEditMode();
  }
  scrollToForm();
}
