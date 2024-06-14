import React, { useState, useEffect } from "react";
import GetLast from "../../../../action/GetLast";

interface Props {
  feed: string;
  n: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
}

export default function NumberState(props: Props) {
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const result = await GetLast(props.feed);
    props.setNumber(+result.value);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderValue = () => {
    switch (props.feed) {
      case "temperature":
        return `${props.n}°C`;
      case "moisture":
        return `${props.n}%`;
      case "light":
        return `${props.n}lx`;
      default:
        return `${props.n}%`;
    }
  };

  return (
    <p className="w-32 h-32 flex justify-center items-center lg:text-4xl text-3xl">
      {!loading && renderValue()}
    </p>
  );
}
