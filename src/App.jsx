import Header from "./components/Header";
import Meme from "./components/Meme";

export default function App() {
  return (
    <div className="flex p-4 flex-col items-center min-h-screen bg-gray-100">
      <div className="container mx-auto max-w-lg  shadow-lg border-2 border-gray-300 rounded-lg bg-white">
        <Header />
        
        <Meme/>
      </div>
    </div>
  );
}
