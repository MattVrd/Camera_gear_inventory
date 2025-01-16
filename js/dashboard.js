//Update the Dashboard with the amount of Cameras and Lenses saved in the arrays
function updateDashboard() {
  const camerasCount = cameras.length;
  const lensesCount = lenses.length;

  document.getElementById("amountOfCameras").innerText = camerasCount;
  document.getElementById("amountOfLenses").innerText = lensesCount;

  const cameraStat = document.querySelector(".stat:nth-child(1)"); //Camera icon
  const lensStat = document.querySelector(".stat:nth-child(2)"); //Lens icon

  //Update camera icon background color
  if (camerasCount > 0) {
    cameraStat.classList.remove("gray-background");
  } else {
    cameraStat.classList.add("gray-background");
  }

  //Update lens icon background color
  if (lensesCount > 0) {
    lensStat.classList.remove("gray-background");
  } else {
    lensStat.classList.add("gray-background");
  }
}


