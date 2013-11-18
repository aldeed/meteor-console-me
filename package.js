Package.describe({
  summary: "Causes console.log() on the server to display on the client console as well"
});

Package.on_use(function(api) {
  "use strict";
  if (api.export) {
    api.export('ConsoleMe');
  }
  api.use(['mongo-livedata']);
  api.add_files('console-me.js');
});