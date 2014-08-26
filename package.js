Package.describe({
  name: "aldeed:console-me",
  summary: "Causes console.log() on the server to display on a client console as well",
  version: "0.1.2",
  git: "https://github.com/aldeed/meteor-console-me.git"
});

Package.on_use(function(api) {
  if (api.versionsFrom) {
    api.use('mongo-livedata@1.0.0');
  } else {
    api.use('mongo-livedata');
  }
  api.add_files('console-me.js');
  api.export('ConsoleMe');
});