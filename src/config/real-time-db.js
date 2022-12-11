import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCpVj_v40ah1_fd45mf4ZszSl3Ca7Mx5Jk',
  authDomain: 'iot-fueltheft-detection-system.firebaseapp.com',
  databaseURL:
    'https://iot-fueltheft-detection-system-default-rtdb.firebaseio.com',
  projectId: 'iot-fueltheft-detection-system',
  storageBucket: 'iot-fueltheft-detection-system.appspot.com',
  messagingSenderId: '884914994746',
  appId: '1:884914994746:web:f577bf6ea123fa0942bf03',
  measurementId: 'G-GEGC81E4QF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
