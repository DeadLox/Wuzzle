var Wuzzle = {};
Wuzzle.indexedDB = {};
Wuzzle.indexedDB.db = null;
var dbName = "Wuzzle";
var dico = new Array("UE", "BI");

Wuzzle.indexedDB.open = function() {
  var version = 2;
  var request = indexedDB.open(dbName, version);

  // We can only create Object stores in a versionchange transaction.
  request.onupgradeneeded = function(e) {
    var db = e.target.result;

    // A versionchange transaction is started automatically.
    e.target.transaction.onerror = Wuzzle.indexedDB.onerror;

    if(db.objectStoreNames.contains("dico")) {
      db.deleteObjectStore("dico");
    }

    var store = db.createObjectStore("dico", {keyPath: "text"});
  };

  request.onsuccess = function(e) {
   Wuzzle.indexedDB.db = e.target.result;
   console.log("Database created");
   Wuzzle.indexedDB.generateDico();
   Wuzzle.indexedDB.getAllWords();
  };

  request.onerror = Wuzzle.indexedDB.onerror;
};

Wuzzle.indexedDB.generateDico = function(){
   for(var x in dico){
      Wuzzle.indexedDB.addWord(dico[x]);
   }
}

Wuzzle.indexedDB.addWord = function(word){
   var db = Wuzzle.indexedDB.db;
   var trans = db.transaction(["dico"], "readwrite");
   var store = trans.objectStore("dico");
   var request = store.put({
      "text": word
   });

   request.onerror = function(e) {
      console.log(e.value);
   };
}

Wuzzle.indexedDB.getAllWords = function() {
  var db = Wuzzle.indexedDB.db;
  var trans = db.transaction(["dico"], "readwrite");
  var store = trans.objectStore("dico");

  // Get everything in the store;
  var keyRange = IDBKeyRange.lowerBound(0);
  var cursorRequest = store.openCursor(keyRange);

  cursorRequest.onsuccess = function(e) {
    var result = e.target.result;
    if(!!result == false)
      return;

    console.log(result.value);
    result.continue();
  };

  cursorRequest.onerror = Wuzzle.indexedDB.onerror;
};