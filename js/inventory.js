//Function to fill the inventory tables
function fillInventory() {
  const cameraTableBody = document.querySelector("#cameraTable tbody");
  const lensTableBody = document.querySelector("#lensTable tbody");

  //Clear existing rows
  cameraTableBody.innerHTML = "";

  //Add cameras to the inventory
  cameras.forEach((camera) => {
    const row = document.createElement("tr");
    row.setAttribute("data-camera-id", camera.id);
    row.innerHTML = `
    <td style="display:none;">${camera.id}</td>
            <td>${camera.brand} ${camera.model}</td>
            <td>${camera.technology}</td>
            <td>${camera.sensorSize}</td>
            <td>${camera.megapixels}</td>
            <td>${camera.lensMount}</td>
            <td>
                <button onclick="fillEditCamera(${camera.id}); scrollToForm(); enterEditMode();">Edit</button>
                <button onclick="deleteCamera(${camera.id}); fillInventory();">Delete</button>
            </td>
        `;
    cameraTableBody.appendChild(row);
  });

  lensTableBody.innerHTML = "";

  //Add lenses to the inventory
  lenses.forEach((lens) => {
    const row = document.createElement("tr");
    row.setAttribute("data-lens-id", lens.id);
    row.innerHTML = `
            <td>${lens.brand} ${lens.model}</td>
            <td>${lens.focalLength} mm</td>
            <td>F/${lens.aperture}</td>
            <td>${lens.sensorSize}</td>
            <td>${lens.lensMount}</td>
            <td>
                <button onclick="fillEditLens(${lens.id}); scrollToForm(); enterEditMode();">Edit</button>
                <button onclick="deleteLens(${lens.id}); fillInventory();">Delete</button>
            </td>
        `;
    lensTableBody.appendChild(row);
  });
}

//Automatically scroll down to the input form
function scrollToForm() {
  const form = document.getElementById("gearForm");
  if (form) {
    form.scrollIntoView({ behavior: "smooth" });
  }
}

function changeCameraLine(camera) {
  //Search the inventory for the line with the same id and save the line in the cameraLine variable
  const cameraLine = document.querySelector("#cameraTable tbody tr[data-camera-id='" + camera.id + "']");

  if (cameraLine) {
    //Update the inner HTML of the row with the new form inputs
    cameraLine.innerHTML = `
      <td>${camera.brand} ${camera.model}</td>
      <td>${camera.technology}</td>
      <td>${camera.sensorSize}</td>
      <td>${camera.megapixels}</td>
      <td>${camera.lensMount}</td>
      <td>
          <button onclick="fillEditCamera(${camera.id}); scrollToForm(); enterEditMode();">Edit</button>
          <button onclick="deleteCamera(${camera.id}); fillInventory();">Delete</button>
      </td>
    `;
  }
}

function changeLensLine(lens) {
  const lensLine = document.querySelector("#lensTable tbody tr[data-lens-id='" + lens.id + "']");

  if (lensLine) {
    // Update the inner HTML of the row with the new form inputs
    lensLine.innerHTML = `
      <td>${lens.brand} ${lens.model}</td>
      <td>${lens.focalLength} mm</td>
      <td>F/${lens.aperture}</td>
      <td>${lens.sensorSize}</td>
      <td>${lens.lensMount}</td>
      <td>
          <button onclick="fillEditLens(${lens.id}); scrollToForm(); enterEditMode();">Edit</button>
          <button onclick="deleteLens(${lens.id}); fillInventory();">Delete</button>
      </td>
    `;
  }
}

document.getElementById("type").addEventListener("change", updateDynamicFields);
