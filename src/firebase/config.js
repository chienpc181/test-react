
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, getDoc, limit, orderBy, query, onSnapshot, addDoc, serverTimestamp} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAd30TODUaZZ1IX3fa_eHoeB_a7eZm49HQ",
    authDomain: "iotthesis-ec128.firebaseapp.com",
    databaseURL: "https://iotthesis-ec128-default-rtdb.firebaseio.com",
    projectId: "iotthesis-ec128",
    storageBucket: "iotthesis-ec128.appspot.com",
    messagingSenderId: "830472561459",
    appId: "1:830472561459:web:5d9a28b2cb1626aa05d446",
    measurementId: "G-9KTHRDQDC8"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  
  export const querySensorTest = async () => {
    const sensor1 = collection(db, "ESP32_SensorTest");
    const querySensor = query(sensor1, orderBy("Time", "desc"));

    const docSnap = await getDocs(querySensor);
    let data = [];
    docSnap.docs.forEach((doc) => data.push({...doc.data(), id: doc.id}));
    return data;
  };

  export const querySensorLast10 = async (sensorDatabaseName) => {
    const dataRef = collection(db, sensorDatabaseName);
    const querySensor = query(dataRef, orderBy("Time", "desc"), limit(10));
    const docSnap = await getDocs(querySensor);
    let data = [];
    docSnap.docs.forEach((doc) => data.push({...doc.data(), id: doc.id}));

    return data;
  };

  export const getRealtimeData = async (sensorDatabaseName) => {
    const dataRef = collection(db, sensorDatabaseName);
    const querySensor = query(dataRef, orderBy("Time", "desc"), limit(10));

    
    const realtimeData = [];
    onSnapshot(querySensor, (snapshot) => {
      // realtimeData = snapshot.docs.map((doc) => doc.data());
      // realtimeData = [];
      snapshot.docs.forEach((doc) => {
        realtimeData.push({...doc.data(), id: doc.id});
      });
      // console.log(realtimeData);
    });
    
    // unsubscribe();
    // return () => unsubscribe();
    return realtimeData;
  };

  export const createSensorDetail = async (sensorDatabaseName) => {
    const dataRef = collection(db, sensorDatabaseName);

    const newDocData = {
      AirQuality: 100,
      Dust: 100,
      Loudness: 100,
      Vibration: 100,
      Time: serverTimestamp()
    }
    const newDocRef = await addDoc(dataRef, newDocData);
    const docSnapshot = await getDoc(newDocRef);
    const docData = docSnapshot.data();

    return newDocRef;
  }
  
  export { db };