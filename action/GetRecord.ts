"use client";
import { db } from "../firebase/firebaseConfig";
import { query, collection, orderBy, limit, getDocs, startAfter, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

let lastVisible: QueryDocumentSnapshot<DocumentData> | null = null;

export default async function GetRecord(uid: string, loadMore = false) {
    let docRef;
    if (loadMore && lastVisible) {
        docRef = query(
            collection(db, "users", uid, "records"),
            orderBy("createdDate", "desc"),
            startAfter(lastVisible), // Start after the last retrieved document
            limit(25)
        );
    } else {
        docRef = query(
            collection(db, "users", uid, "records"),
            orderBy("createdDate", "desc"),
            limit(25)
        );
    }

    const docSnap = await getDocs(docRef);
    lastVisible = docSnap.docs[docSnap.docs.length - 1] || null; // Update last visible document for pagination

    const hasMore = docSnap.docs.length === 25; // Check if there are more documents to fetch

    return { docSnap, hasMore };
}
