ConsoleMe = {};

if (Meteor.isServer) {
  ConsoleMe.enabled = false;
  
  var sharedConsole = new Meteor.Collection('_console', {connection: null});
  var originalLog = console.log;
  console.log = Meteor.bindEnvironment(function() {
    originalLog.apply(console, arguments);
    if (ConsoleMe.enabled) {
      // Stringify arguments, stopping recursion at any circular references
      // to avoid errors.
      var args = Array.prototype.slice.call(arguments);
      var cache = [];
      args = args.map(function (arg) {
        return JSON.stringify(arg, function(key, value) {
          if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return;
            }
            // Store value in our collection
            cache.push(value);
          }
          return value;
        });
      });
      cache = null; // Enable garbage collection
      sharedConsole.insert({args: args, createdAt: new Date});
    }
  });

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

  sharedConsole.find().observe({
    added: function(doc) {
      var args = ["Server (" + doc.createdAt.toUTCString() + "):"];
      for (var i = 0, ln = doc.args.length; i < ln; i++) {
          args.push(JSON.parse(doc.args[i]));
      }
      console.log.apply(console, args);
    }
  });
  
  var subHandle;
  ConsoleMe.subscribe = function consoleMeSubscribe() {
    subHandle = Meteor.subscribe("_console");
  };
  
  ConsoleMe.unsubscribe = function consoleMeUnsubscribe() {
    subHandle && subHandle.stop();
    subHandle = null;
  };
}
