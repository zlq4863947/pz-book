require(["gitbook", "jQuery"], function(gitbook, $) {
  var livere_uid;
  var timer;

  function loadInstance() {
    if (!window) {
      return;
    }
    if (window.document.getElementById("livere-js") === null) {
      const script = window.document.createElement("script");
      script.async = true;
      script.src = "https://cdn-city.livere.com/js/embed.dist.js";
      script.id = "livere-js";
      script.onload = () => {
        setTimeout(() => {
          clearTimeout(timer);
          timer = null;
        }, 300);
      };
      window.document.body.appendChild(script);
      return;
    }
    if (window.LivereTower && timer === null) {
      timer = setTimeout(() => {
        try {
          window.LivereTower.reload();
        } catch (e) {
          createLivereDiv();
          window.LivereTower.init();
        }
        clearTimeout(timer);
        timer = null;
      }, 300);
    }
  }

  function createLivereDiv() {
    var $livereDiv = $("<div>", {
      id: "lv-container",
      "data-id": "city",
      "data-uid": livere_uid
    });
    $(".book-body .page-inner").append($livereDiv);
  }

  gitbook.events.bind("start", function(e, config) {
    config.livere = config.livere || {};
    livere_uid = config.livere.uid;
    loadInstance();
    createLivereDiv();
  });

  gitbook.events.bind("page.change", loadInstance);
});
