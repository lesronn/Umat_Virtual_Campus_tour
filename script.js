function onReady(callback) {
  var intervalId = window.setInterval(function () {
    if (document.getElementsByTagName("body")[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 300);
}

function setVisible(selector, visible) {
  document.querySelector(selector).style.display = visible ? "block" : "none";
}

window.addEventListener("load", function () {
  // This fires when everything is fully loaded including all resources
  console.log("Page fully loaded");
  onReady(function () {
    setVisible(".page", true);
    setVisible("#loading", false);
  });
});

// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector(".progress-bar");
  const updatingBar = event.target.querySelector(".update-bar");
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add("hide");
    event.target.removeEventListener("progress", onProgress);
  } else {
    progressBar.classList.remove("hide");
  }
};
document.querySelector("model-viewer").addEventListener("progress", onProgress);
