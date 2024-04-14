import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to AI NFT Minter</h1>
        <div className="space-x-4">
          <Link to={"/ImageGenerator"}>
            <button className=" bg-slate-100 hover:bg-slate-500 text-purple-500 font-bold py-2 px-4 rounded">
              Generate Image
            </button>
          </Link>

          <Link to={"/NFTMinter"}>
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Generate + Mint Image
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
