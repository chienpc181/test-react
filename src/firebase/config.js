import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, getDoc, limit, orderBy, query, where, onSnapshot, addDoc, serverTimestamp} from "firebase/firestore";
import { Timestamp } from 'firebase/firestore';

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

const queryLast10MaxValues = async (sensorDatabaseName, sensorType) => {
  const maxValues = [];
  const today = new Date();
  for (let i = 9; i >= 0; i--) {
    const date = new Date(today); 
    date.setDate(today.getDate() - i);
    const maxValue = await getMaxValueByDate(sensorDatabaseName, date, sensorType);
    maxValues.push(maxValue);
  }
  
  return maxValues;
}



const getMaxValueByDate = async (sensorDatabaseName, date, field) => {
  const valueInDays = [];
  for (let i = 0; i < 24; i+= 24){
    const hourStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), i, 0, 0);
    const hourEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), i + 23, 59, 59);
    const hourStartTimestamp = Timestamp.fromDate(hourStart);
    const hourEndTimestamp = Timestamp.fromDate(hourEnd);
    const queryByHour = query(collection(db, sensorDatabaseName), where("Time", ">=", hourStartTimestamp)
    , where("Time", "<=", hourEndTimestamp), limit(1));
    const querySnapshot = await getDocs(queryByHour);
    if(querySnapshot.size > 0){
      valueInDays.push({
        value: querySnapshot.docs[0].data()[field],
        time: convertToDateTimeLong(hourStartTimestamp),
      });
    }
  }
  if(valueInDays.length > 0){
    valueInDays.sort(function(a, b){
      return b.value - a.value;
    });
    return {
      value: valueInDays[0].value,
      time: valueInDays[0].time,
    }
  }
  else{
    return {
      value: 0,
      time: convertToDateTimeLong(Timestamp.fromDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()))),
    }
  }
}

const formatDatetime = (datetime) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(datetime));

  return formattedDate;
}

export const getChartLast10Days = async (sensorDatabaseName, sensorType) => {
  const maxValues = await queryLast10MaxValues(sensorDatabaseName, sensorType);
  const values = maxValues.map(max => max.value);
  const maxValue = Math.max(...values);
  const indexMax = values.indexOf(maxValue);
  return {
    data: values,
    labels: maxValues.map(max => formatDatetime(max.time)),
    maxAt: maxValues.map(max => max.time)[indexMax],
  }
}

const convertToDateTime = (timeStamp) => {
  return new Date(timeStamp.seconds*1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const convertToDateTimeLong = (timeStamp) => {
  return new Date(timeStamp.seconds*1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
}

  export const TestRealtime = async (sensorDatabaseName) => {
    const [doc, setDoc] = useState({});

    useEffect(() => {
      const unsub = () => {
        const dataRef = collection(db, sensorDatabaseName);
        const querySensor = query(dataRef, orderBy("Time", "desc"), limit(1));
        
        onSnapshot(querySensor, async () => {
          const docSnap = await getDocs(querySensor);
          // const realtimeData = docSnap.docs.forEach((doc) => realtimeData.push({ ...doc.data(), id: doc.id }));
          const realtimeData = docSnap.docs[0].data();
          realtimeData.id = docSnap.docs[0].id;
          
          setDoc(realtimeData);


        })
      }
      return () => unsub();
    }, [sensorDatabaseName]);
    console.log(doc);
    return doc;
  }

  export const getRealtimeData = async (sensorDatabaseName) => {
    const dataRef = collection(db, sensorDatabaseName);
    const querySensor = query(dataRef, orderBy("Time", "desc"), limit(1));

    var docSnap = await getDocs(querySensor);
    onSnapshot(querySensor, async (snapshot) => {
      // snapshot.docs.forEach((doc) => {
      //   realtimeData.push({...doc.data(), id: doc.id});
      // });
      
      docSnap = await getDocs(querySensor);
    });
    
    const realtimeData = [];
    docSnap.docs.forEach((doc) => realtimeData.push({ ...doc.data(), id: doc.id }));
    // console.log(realtimeData);
    return realtimeData;
  };

  export const createSensorDetail = async (sensorDatabaseName) => {
    const dataRef = collection(db, sensorDatabaseName);

    const newDocData = {
      AirQuality: 100,
      Dust: 200,
      Loudness: 300,
      Vibration: 400,
      Time: serverTimestamp()
    }
    const newDocRef = await addDoc(dataRef, newDocData);
    const docSnapshot = await getDoc(newDocRef);
    const docData = docSnapshot.data();

    return newDocRef;
  }
  
  export { db };