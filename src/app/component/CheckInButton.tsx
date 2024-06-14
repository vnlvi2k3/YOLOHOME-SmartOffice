import React from "react";
import { useRouter } from "next/navigation";

const CheckInButton: React.FC = () => {
    const router = useRouter();

    const handleCheckIn = () => {
        router.push("/check-in");
    };

    return (
        <button 
            onClick={handleCheckIn}
            className="p-1 border-2 border-black text-black rounded-full"
        >
            Check In
        </button>
    );
};

export default CheckInButton;
