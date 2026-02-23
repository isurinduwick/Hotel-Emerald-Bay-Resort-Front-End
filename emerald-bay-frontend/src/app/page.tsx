import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Navbar />
      <main className="flex flex-1 w-full flex-col items-center justify-center" />
    </div>
  );
}
