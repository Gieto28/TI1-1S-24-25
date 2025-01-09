window.addEventListener("mouseover", initLandbot, { once: true });
window.addEventListener("touchstart", initLandbot, { once: true });

let myLandbot;

function initLandbot() {
  if (!myLandbot) {
    const s = document.createElement("script");

    s.type = "module";
    s.async = true;
    s.addEventListener("load", function () {
      myLandbot = new Landbot.Popup({
        configUrl:
          "https://storage.googleapis.com/landbot.online/v3/H-2739780-GLAS9H2W1ON2JSUM/index.json",
      });
    });
    s.src = "https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs";

    const x = document.getElementsByTagName("script")[0];

    x.parentNode.insertBefore(s, x);
  }
}
