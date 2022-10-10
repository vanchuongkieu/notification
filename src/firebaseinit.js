import firebase from 'firebase';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCJEkyQb_tuKn0zkHvPkp8FkjBbqbZ7RCI',
  authDomain: 'votv9696.firebaseapp.com',
  databaseURL: 'https://votv9696-default-rtdb.firebaseio.com',
  projectId: 'votv9696',
  storageBucket: 'votv9696.appspot.com',
  messagingSenderId: '943717022802',
  appId: '1:943717022802:web:ecf9427a8d0907c2fd738b',
  measurementId: 'G-FHG1GTT5YC',
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
