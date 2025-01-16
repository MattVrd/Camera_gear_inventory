//Add event listeners for other functionalities if needed
document.getElementById("type").addEventListener("change", updateDynamicFields);

//Initialize some Cameras and Lenses
cameras.push(new Camera("DSLR", "Canon", "EOS R5", "Full Frame", 45, "RF"));
cameras.push(new Camera("DSLR", "Nikon", "D3300", "APS-C", 24.2, "F-Mount"));
cameras.push(new Camera("Mirrorless", "Sony", "A7 III", "Full Frame", 24.2, "E"));
cameras.push(new Camera("Mirrorless", "Olympus", "OM-D E-M10 Mark III", "Micro Four Thirds", 16, "OM-System"));
cameras.push(new Camera("Film", "Fujifilm", "X100", "35mm", "-", "X-Mount"));

lenses.push(new Lens("Canon", "Prime", "Full Frame", 50, "1.8", "RF"));
lenses.push(new Lens("Sony FE", "Zoom", "Full Frame", "24-70", "2.8", "E"));
lenses.push(new Lens("Canon", "Prime", "APS-C", 50, "1.8", "EF/EF-S"));
lenses.push(new Lens("Nikon AF-S DX NIKKOR", "Prime", "APS-C", 35, "1.8", "F-Mount"));
lenses.push(new Lens("Panasonic Lumix G", "Prime", "Micro Four Thirds", 25, "1.7", "Micro Four Thirds Mount"));
lenses.push(new Lens("Fujifilm Fujinon", "Prime", "35mm", 25, "2.0", "X-Mount"));

//Calling the function to set initial fields
updateDynamicFields();

//Calling the function to initialise the Dashboard numbers
updateDashboard();

//Call the function to fill the inventory when the page loads
document.addEventListener("DOMContentLoaded", init);

//Save and Load Objects on a persistant storage
function saveToLocalStorage() {
  //Stringifying the arrays
  localStorage.setItem("cameras", JSON.stringify(cameras));
  localStorage.setItem("lenses", JSON.stringify(lenses));
}

function loadFromLocalStorage() {
  const savedCameras = localStorage.getItem("cameras");
  const savedLenses = localStorage.getItem("lenses");

  if (savedCameras) {
    //Parsing the JSON string into a JavaScript object, resulting in an array of camera objects
    const parsedCameras = JSON.parse(savedCameras);
    parsedCameras.forEach((camera) => {
      //Check if the camera already exists before adding it
      if (!cameras.some((existingCamera) => existingCamera.id === camera.id)) {
        cameras.push(camera);
      }
    });
  }

  if (savedLenses) {
    const parsedLenses = JSON.parse(savedLenses);
    parsedLenses.forEach((lens) => {
      //Check if the lens already exists before adding it
      if (!lenses.some((existingLens) => existingLens.id === lens.id)) {
        lenses.push(lens);
      }
    });
  }
}

