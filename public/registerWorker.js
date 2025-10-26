if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("Service Worker registered successfully:", registration.scope);

        // Check for updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              console.log("New service worker available, refresh to update");
            }
          });
        });
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });

  // Listen for messages from the service worker
  navigator.serviceWorker.addEventListener("message", (event) => {
    console.log("Message from service worker:", event.data);
  });
}
