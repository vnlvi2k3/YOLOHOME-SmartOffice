"use client"
import { auth, db } from "../firebase/firebaseConfig"
import { doc, setDoc, getDoc } from "firebase/firestore";

export default async function CreateRecord(state: any, priority: Boolean, number: NumberState, uid: string) {
    if (state) {
        if (number) {
            if (uid) {
                const date = new Date(Date.now())
                const recordRef = doc(db, "users", uid, "records", `${date.getHours()}:${date.getMinutes()} ${date.toDateString()}`);
                await setDoc(recordRef, {
                    fanspeed: Number(state.fan.velocity),
                    led: state.led == "1" || state.led == "2" ? true : false,
                    light: Number(number.light),
                    mode: priority,
                    moisture: Number(number.moisture),
                    soilmoisture: Number(number.soilmoisture),
                    temperature: Number(number.temperature),
                    water: state.water == "1" || state.water == "2" ? true : false,
                    fan: state.fan.state == "1" || state.fan.state == "2" ? true : false,
                    createdDate: date
                });
            }
        }
    }

}