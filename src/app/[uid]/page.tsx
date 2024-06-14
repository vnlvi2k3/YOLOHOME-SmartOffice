import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import BackButton from "./BackButton";
import RecordList from "./RecordList";
import { db } from "../../../firebase/firebaseConfig";
import Image from "next/image";

interface Props {
  params: {
    uid: string;
  };
}
export async function generateMetadata({ params: { uid } }: Props) {
  return {
    title: "Records",
  };
}

export default async function Uid({ params: { uid } }: Props) {
  return (
    <>
      <main className="h-screen flex">
        <BackButton />
        <RecordList uid={uid} />
      </main>
    </>
  );
}
