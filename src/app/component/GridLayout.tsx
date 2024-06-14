import Navbar from "./Navbar";
import ChartSection from "./ChartSection";
import Sidebar from "./sidebar/Sidebar";
import { Toaster } from "react-hot-toast";

export default function GridLayout() {
  return (
    <>
      <main className=" lg:grid gridLayout lg:h-screen lg:items-stretch lg:justify-stretch flex flex-col items-center justify-center">
        <Navbar />
        <ChartSection />
        <Sidebar />
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "",
            duration: 3000,
            style: {
              background: "#22c55e",
              color: "#fff",
            },
            success: {
              duration: 3000,
            },
          }}
        />
      </main>
    </>
  );
}
