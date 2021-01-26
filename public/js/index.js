init();

async function init() {
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    if (workout) {
      // location.search = "?id=" + workout._id;
      //Changed to the below code b/c the refresh on getting the new param was sloppy
      window.history.pushState({}, '', `?id=${workout._id}`)
    } else {
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}

