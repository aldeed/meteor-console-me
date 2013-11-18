if (Meteor.isServer) {
  ConsoleMe = {
    enabled: false
  };
  
  var sharedConsole = new Meteor.Collection('_console', {connection: null});
  var originalLog = console.log;
  console.log = function() {
    originalLog.apply(console, arguments);
    if (ConsoleMe.enabled) {
      sharedConsole.insert({args: arguments, createdAt: new Date});
    }
  };

  Meteor.publish("_console", function() {
    var self = this;
    var initializing = true;
    var handle = sharedConsole.find().observe({
      added: function(doc) {
        if (!initializing) {
          self.added("_clientConsole", doc._id, doc);
          sharedConsole.remove({_id: doc._id});
        }
      }
    });
    initializing = false;
    self.ready();

    // Stop observing the cursor when client unsubs.
    self.onStop(function() {
      handle.stop();
    });
  });
}

if (Meteor.isClient) {
  var sharedConsole = new Meteor.Collection('_clientConsole');
  Meteor.subscribe("_console");

  sharedConsole.find().observe({
    added: function(doc) {
      var args = ["Server (" + doc.createdAt.toUTCString() + "):"];
      for (var i = 0, ln = doc.args.length; i < ln; i++) {
        args.push(doc.args[i]);
      }
      console.log.apply(console, args);
    }
  });
}