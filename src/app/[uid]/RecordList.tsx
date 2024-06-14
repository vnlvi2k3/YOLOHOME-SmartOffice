"use client";
import React, { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { motion } from "framer-motion";
import GetRecord from "../../../action/GetRecord";
import LoadMoreButton from "./LoadMoreButton"; // Import the new component
import RecordListItem from "./RecordListItem"; // Import the new RecordListItem component
import RecordView from "./RecordView";

interface Props {
  uid: string;
}

interface StateRecord {
  id: string;
  data: DocumentData;
}

const UlVars = {
  initital: {
    transition: {
      staggerChildren: 0.3,
      staggerDirection: -1,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
      staggerDirection: 1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
      staggerDirection: -1,
    },
  },
};

export default function RecordList({ uid }: Props) {
  const [clicked, setClicked] = useState(false);
  const [indexC, setIndexC] = useState(0);
  const [mapped, setMapped] = useState<StateRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true); // New state to track if there are more records

  const fetchInitialRecords = async () => {
    setLoading(true);
    try {
      const { docSnap, hasMore } = await GetRecord(uid);
      const newRecords: StateRecord[] = docSnap.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setMapped(newRecords);
      setHasMore(hasMore); // Update the hasMore state
    } catch (error) {
      console.error("Error fetching initial records:", error);
    }
    setLoading(false);
  };

  const fetchMoreRecords = async () => {
    setLoading(true);
    try {
      const { docSnap, hasMore } = await GetRecord(uid, true);
      const newRecords: StateRecord[] = docSnap.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setMapped((prevRecords) => [...prevRecords, ...newRecords]);
      setHasMore(hasMore); // Update the hasMore state
    } catch (error) {
      console.error("Error fetching more records:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialRecords();
  }, [uid]);

  return (
    <>
      <motion.ul
        variants={UlVars}
        initial="initial"
        animate="animate"
        exit="exit"
        className=" py-3 h-full w-full flex-grow bg-white rounded-l-3xl flex flex-wrap gap-7 justify-center md:justify-normal lg:justify-normal overflow-y-auto overflow-x-hidden"
      >
        {mapped.map((doc, index) => (
          <>
            {clicked && index === indexC && (
              <RecordView record={doc} setClicked={setClicked} />
            )}
            <RecordListItem
              key={index}
              record={doc}
              index={index}
              clicked={clicked}
              indexC={indexC}
              setClicked={setClicked}
              setIndexC={setIndexC}
            />
          </>
        ))}
        <LoadMoreButton
          loading={loading}
          fetchMoreRecords={fetchMoreRecords}
          hasMore={hasMore}
        />
      </motion.ul>
    </>
  );
}
