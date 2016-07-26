import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDvCzHI4YfUhk53OOQXmEfXrxEY-ygy75E',
  authDomain: 'notes-app-79591.firebaseapp.com',
  databaseURL: 'https://notes-app-79591.firebaseio.com',
  storageBucket: 'notes-app-79591.appspot.com',
};
firebase.initializeApp(config);

const database = firebase.database();

export function subscribeToNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

export function removeNote(id) {
  database.ref('notes').child(id)
  .remove();
}

export function updateNote(id, fields) {
  database.ref('notes').child(id)
  .update(fields);
}

export function createNote(note) {
  database.ref('notes').push(note);
}
