import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { uploadImageUrlToIPFS } from "../utils/Pinata";
import { mintNFT } from "../utils/operations";
import { getAccount } from "../utils/wallet";
import { useLocation } from "react-router-dom";

const Minter = () => {
  const [positivePrompt, setPositivePrompt] = useState("");
  const [AIImage, setAIImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const currentURL = useLocation().pathname;

  useEffect(() => {
    console.log("current url: ", currentURL);
  }, []);

  const url = import.meta.env.VITE_AI_IMAGE_GENERATOR_API_URL;
  const rapidapi_key = import.meta.env.VITE_X_RapidAPI_Key;
  const rapidapi_host = import.meta.env.VITE_X_RapidAPI_Host;

  const generateAIImage = async () => {
    const options = {
      method: "POST",
      url: url,
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": rapidapi_key,
        "X-RapidAPI-Host": rapidapi_host,
      },
      data: {
        prompt: positivePrompt,
        // page: 1,
        negativePrompt: "",
      },
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      // console.log(response.data);
      setAIImage(response.data?.results.images[0]);
      // setAIImage(response.data.ImageUrl);
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    if (positivePrompt === "") {
      toast.error("positive prompts cannot be empty");
      return;
    }
    // setLoading(true);
    try {
      await generateAIImage();
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const uploadImageToIpfs = async () => {
    try {
      // uploading image to IPFS
      const IPFSUrl = await uploadImageUrlToIPFS(AIImage, positivePrompt);
      return IPFSUrl;
      // console.log("imaged upload in frontend", IPFSUrl);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const onMintClick = async () => {
    const activeAddress = await getAccount();

    if (
      activeAddress &&
      activeAddress !== undefined &&
      activeAddress !== null
    ) {
      // console.log("uploading image to IPFS...");
      try {
        setLoading(true);
        const IPFSUrl = await uploadImageToIpfs();

        // using IPFS and metadata, call minting function
        if (IPFSUrl !== null && IPFSUrl !== undefined) {
          try {
            const mintingRes = await mintNFT(
              positivePrompt,
              IPFSUrl,
              activeAddress
            );
            // console.log("minting completed", mintingRes);
            if (mintingRes !== undefined) {
              toast.success("NFT Minted Successfully");
            } else {
              toast.error("NFTminting Failed");
            }
          } catch (err) {
            // alert("Something went wrong");
            toast.error(
              "Something went wrong, make sure you have connected your wallet"
            );
          }
        }
      } catch (error) {
        toast.error(
          "Something went wrong, make sure you have connected your wallet"
        );
      } finally {
        setLoading(false);
        setPositivePrompt("");
      }
    }
  };

  return (
    <div className="flex md:flex-row flex-col">
      {/* Left half */}
      <div className="w-full md:w-1/2 md:p-10 p-4 md:pl-24">
        <h2 className="text-lg font-semibold mb-4">
          Enter Prompts to generate AI Image
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Prompt
          </label>
          <textarea
            id="name"
            name="name"
            className="mt-1 block w-full h-32 text-black p-2 border-gray-300 rounded-md shadow-sm outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setPositivePrompt(e.target.value)
            }
            disabled={loading}
          />
        </div>

        <button
          disabled={loading}
          onClick={onSubmit}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded relative"
        >
          {loading && "Loading.."}
          {!loading && "Generate"}
        </button>

        {!loading && AIImage && currentURL !== "/imageGenerator" && (
          <button
            disabled={loading}
            onClick={onMintClick}
            className="bg-purple-500 hover:bg-purple-700 ml-4 text-white font-bold py-2 px-4 rounded relative"
          >
            Mint
          </button>
        )}
      </div>

      {/* Right half */}
      <div className="w-full md:w-1/2 h-[400px] mt-10 md:mt-0">
        {loading && (
          <div>
            <div className="loader mt-40 ml-20"></div>
          </div>
        )}
        {!loading && (
          <img
            src={AIImage ? AIImage : "https://via.placeholder.com/500"}
            alt="Placeholder"
            className="w-[800px] h-[700px]"
          />
        )}
      </div>
    </div>
  );
};

export default Minter;
