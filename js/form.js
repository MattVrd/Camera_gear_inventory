//Add new Gear or edit existing gear
function initGear() {
  let gearForm = document.getElementById("gearForm");
  gearForm.addEventListener("submit", function (event) {
    event.preventDefault(); //Prevent the default form submission

    const type = document.getElementById("type").value;

    if (type === "camera") {
      //Create an object to hold the form data
      const formData = {
        id: document.getElementById("cameraId").value,
        technology: document.getElementById("technology").value,
        brand: document.getElementById("cameraBrand").value,
        model: document.getElementById("cameraModel").value,
        sensorSize: document.getElementById("cameraSensorSize").value,
        megapixels: document.getElementById("megapixels").value,
        lensMount: document.getElementById("lensMount").value,
      };
      //If the id already exists
      if (formData.id) {
        //Edit Camera
        const cameraToEdit = cameras.find((camera) => camera.id === Number(formData.id)); //Convert to int because fromData is string type
        //Save the values from the Form into the existing Object
        cameraToEdit.technology = formData.technology;
        cameraToEdit.brand = formData.brand;
        cameraToEdit.model = formData.model;
        cameraToEdit.sensorSize = formData.sensorSize;
        cameraToEdit.megapixels = formData.megapixels;
        cameraToEdit.lensMount = formData.lensMount;

        //Change the inventory line displaying the object
        changeCameraLine(cameraToEdit);
        saveToLocalStorage();
      } else {
        //New Camera
        let camera = new Camera(
          formData.technology,
          formData.brand,
          formData.model,
          formData.sensorSize,
          formData.megapixels,
          formData.lensMount
        );
        //Push the new Camera to the Cameras Array
        cameras.push(camera);
        addCamera(camera);
        updateDashboard();
      }
      saveToLocalStorage();
    } else if (type === "lens") {
      //Object to hold the form data
      const formData = {
        id: document.getElementById("lensId").value,
        brand: document.getElementById("lensBrand").value,
        model: document.getElementById("lensModel").value,
        sensorSize: document.getElementById("lensSensorSize").value,
        focalLength: document.getElementById("focalLength").value,
        aperture: document.getElementById("aperture").value,
        lensMount: document.getElementById("mountingSystem").value,
      };
      //If the id already exists
      if (formData.id) {
        //Edit Lens
        const lensToEdit = lenses.find((lens) => lens.id === Number(formData.id)); //Convert to int because fromData is string type
        //Save the values from the Form into the existing Object
        lensToEdit.brand = formData.brand;
        lensToEdit.model = formData.model;
        lensToEdit.focalLength = formData.focalLength;
        lensToEdit.aperture = formData.aperture;
        lensToEdit.sensorSize = formData.sensorSize;
        lensToEdit.lensMount = formData.lensMount;

        //Change the inventory line displaying the object
        changeLensLine(lensToEdit);
        saveToLocalStorage();
      } else {
        //Create new Lens
        let lens = new Lens(
          formData.brand,
          formData.model,
          formData.focalLength,
          formData.aperture,
          formData.sensorSize,
          formData.lensMount
        );
        //Push the new Lens to the lenses Array
        lenses.push(lens);
        addLens(lens);
        updateDashboard();
      }
      saveToLocalStorage();
    }
    exitEditMode();
  });
  /*//Optionally, you can save it to local storage
        localStorage.setItem('formData', JSON.stringify(formData)); */
}

//Update the input fields according to the selected gear Type
function updateDynamicFields() {
  const type = document.getElementById("type").value;
  const dynamicFields = document.getElementById("dynamicFields");
  dynamicFields.innerHTML = ""; //Clear existing fields

  if (type === "camera") {
    //Todo Validierung.. Länge und type Einschränken
    dynamicFields.innerHTML = ` 
            <input type="text" id="cameraId"  hidden />

            <label for="technology">Technology:</label>
            <input type="text" id="technology" placeholder="Film, DSLR, or Mirrorless" required maxlength="100"/>

            <label for="cameraBrand">Brand:</label>
            <input type="text" id="cameraBrand" placeholder="Nikon, Canon, Panasonic etc" required maxlength="200" />

            <label for="cameraModel">Model:</label>
            <input type="text" id="cameraModel" placeholder="A7 III, X100 etc" required maxlength="100" />

            <label for="cameraSensorSize">Sensor Size:</label>
            <input type="text" id="cameraSensorSize" placeholder="Full Frame, APS-C, Micro four thirds, 35mm (film)" required maxlength="100" />

            <label for="megapixels">Megapixel count:</label>
            <input type="number" id="megapixels" placeholder="24.2, 16, 50 etc" required max="500" step="0.1"/>
            
            <label for="lensMount">Lens Mounting System:</label>
            <input type="text" id="lensMount" placeholder="E, EF/EF-S etc" required maxlength="50" />
        `;
  } else if (type === "lens") {
    dynamicFields.innerHTML = `
            <input type="text" id="lensId"  hidden />

            <label for="lensBrand">Brand:</label>
            <input type="text" id="lensBrand" placeholder="Nikon, Canon, Sigma etc" required maxlength="100" />

            <label for="lensModel">Model:</label>
            <input type="text" id="lensModel" placeholder="DX NIKKOR, Lumix G etc" required maxlength="100" />

            <label for="lensSensorSize">For Sensor Size:</label>
            <input type="text" id="lensSensorSize" placeholder="Full Frame, APS-C, Micro four thirds" required maxlength="100" />

            <label for="focalLength">Focal Length:</label>
            <input type="text" id="focalLength" placeholder="50, 24-70 etc" required />

            <label for="aperture">Aperture:</label>
            <input type="number" id="aperture" placeholder="1.8, 2.8 etc" required />

            <label for="mountingSystem">Lens Mounting System:</label>
            <input type="text" id="mountingSystem" placeholder="E, EF/EF-S etc" required maxlength="100" />
        `;
  }
}

function enterEditMode() {
  document.getElementById("submitButton").innerHTML = "Save changes";
  document.getElementById("formTitel").innerHTML = "Edit existing Gear";

  //Show the hidden revert Button
  document.getElementById("revertButton").style.display = "block";
}

function exitEditMode() {
  //Reset the form fields
  document.getElementById("gearForm").reset();

  //Reset the type to camera
  document.getElementById("type").value = "camera";
  updateDynamicFields(); // Update the dynamic fields based on the default type
  //Update the button text and form title
  document.getElementById("submitButton").innerHTML = "Add gear";
  document.getElementById("formTitel").innerHTML = "Add New Gear";

  //Hide the button again when reverting back to adding new gear
  document.getElementById("revertButton").style.display = "none";
}
