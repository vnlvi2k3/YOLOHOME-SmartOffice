"use client";

import React, { use, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { FaCamera, FaArrowLeft, FaTimes, FaListAlt, FaClipboardList } from 'react-icons/fa'; 
import dynamic from 'next/dynamic';
import styles from './CheckIn.module.css';
import * as tmImage from '@teachablemachine/image';
import { useRouter } from 'next/navigation';
import { getEmployeeId } from './employeeServices';

const CheckIn: React.FC = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [name, setName] = useState('Loading...');
  const [employeeId, setEmployeeId] = useState('Loading...');
  const [label, setLabel] = useState<string[]>([]);
  type RecordType = {
    id: string;
    name: string;
    time: string;
    type: string;
  };
  
  // Then, when you declare your state variable:
  const [records, setRecords] = useState<RecordType[]>([]);
  const [showRecords, setShowRecords] = useState(false);

  const webcamRef = useRef<Webcam>(null);
  const modelRef = useRef<any>(null);

  const router = useRouter();


  useEffect(() => {
    const loadModel = async () => {
      const URL = "https://teachablemachine.withgoogle.com/models/agkCPCR00/";
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      if (tmImage) {
        modelRef.current = await tmImage.load(modelURL, metadataURL);
        console.log("Model loaded");
      }
    };

    loadModel();

    const updateCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) 
        + ' ' + now.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
      setCurrentTime(formattedTime);
    };

    updateCurrentTime(); // Set time immediately upon mounting
    const interval = setInterval(updateCurrentTime, 60000); // Update time every minute

    const savedRecords = localStorage.getItem('records');
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }

    return () => clearInterval(interval); // Cleanup the interval on component unmount

  }, []);

  const predict = async () => {
    if (webcamRef.current && modelRef.current) {
      const prediction = await modelRef.current.predict(webcamRef.current.video);
      const highestPrediction = prediction.filter((p: { className: string; }) => p.className !== 'Background')
                                          .reduce((acc: { probability: number; }, current: { probability: number; }) => current.probability > acc.probability ? current : acc, {probability: 0});

      setName(highestPrediction.className);

      setEmployeeId(getEmployeeId(highestPrediction.className));
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isCameraOn) {
        predict();
      }
    }, 1000); // predict every second

    return () => clearInterval(intervalId);
  }, [isCameraOn]);

  const handleCameraToggle = () => {
    setIsCameraOn(!isCameraOn);
  };

  const handleBack = () => {
    if (router && router.push) {
      router.push('/dashboard');
    }
  };
  const turnOffCamera = () => {
    setIsCameraOn(false);
    setName('Loading...');
    setEmployeeId('Loading...');
  };
  const handleCheckIn = () => {
    if (isCameraOn && name !== 'Background' && name !== 'Loading...') {
      const record = {
        id: employeeId,
        name,
        time: currentTime,
        type: 'Check In'
      };
      const updatedRecords = [...records, record];
      localStorage.setItem('records', JSON.stringify(updatedRecords));
      setRecords(updatedRecords);
      turnOffCamera(); 
    } else {
      alert('Camera must be on and a valid name must be detected.');
    }
  };
  
  const handleCheckOut = () => {
    if (isCameraOn && name !== 'Background' && name !== 'Loading...') {
      const record = {
        id: employeeId,
        name,
        time: currentTime,
        type: 'Check Out'
      };
      const updatedRecords = [...records, record];
      localStorage.setItem('records', JSON.stringify(updatedRecords));
      setRecords(updatedRecords);
      turnOffCamera();
    } else {
      alert('Camera must be on and a valid name must be detected.');
    }
  };
  

  const toggleRecords = () => setShowRecords(!showRecords);
  return (
    <div className={styles.container}>
      <div className={styles.backButtonContainer}>
        <button className={styles.backButton} onClick={handleBack}>
          <FaArrowLeft />
        </button>
      </div>
      <h1 className={styles.title}>Face Detection</h1>
      <div className={styles.cameraView}>
        {isCameraOn ? (
          <Webcam 
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className={styles.cameraFrame}
            videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
          />
        ) : (
          <div className={styles.cameraFrame}>
            <button className={styles.cameraButton} onClick={handleCameraToggle}>
              <FaCamera className={styles.cameraIcon} />
              Open Camera
            </button>
          </div>
        )}
      </div>
      <div className={styles.details}>
        <div className={styles.employeeInfo}>
          <p><strong>Employee ID:</strong> {employeeId}</p>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Check time:</strong> {currentTime}</p>
        </div>
        <div className={styles.checking}>
          <button className={styles.checkinButton} onClick={handleCheckIn}>Check In</button>
          <button className={styles.checkoutButton} onClick={handleCheckOut}>Check Out</button>
          <button className={styles.denyButton} onClick={turnOffCamera}>Turn Off</button>
        </div>
      </div>
      <button className={styles.recordButton} onClick={toggleRecords}>
        <FaClipboardList />  {/* Using the checklist icon for the records button */}
      </button>
      {showRecords && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={toggleRecords}><FaTimes /></button>
            <h2>Record List</h2>
            <div className={styles.recordList}>
              {records.map((record, index) => (
                <div key={index} className={styles.recordItem}>
                  <p><strong>{record.type}</strong>: {record.name} ({record.id}) at {record.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckIn;
