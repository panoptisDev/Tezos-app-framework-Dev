import { useEffect, useState } from "react";
import { connectWallet, getAccount } from "../utils/wallet";

const Navbar = () => {
  const [navExpand, setNavExpand] = useState(false);
  const [account, setAccount] = useState("");

  const onConnectWallet = async () => {
    await connectWallet();
    const activeAccount = await getAccount();
    setAccount(activeAccount);
  };

  useEffect(() => {
    async () => {
      const activeAccount = await getAccount();
      setAccount(activeAccount);
    };
  }, []);

  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-purple-500 text-lg font-bold">
            AI NFT Minter
          </span>
        </div>
        <div className="sm:hidden">
          {/* Hamburger icon for mobile */}
          <button
            onClick={() => setNavExpand(!navExpand)}
            className="text-white hover:text-purple-500"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
              />
            </svg>
          </button>
        </div>
        <div className={`sm:flex ${navExpand ? "block" : "hidden"}`}>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-white hover:text-purple-500">
                Home
              </a>
            </li>
            <li>
              <button
                onClick={onConnectWallet}
                className="text-white hover:text-purple-500"
              >
                {account ? account : "Connect Wallet"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
