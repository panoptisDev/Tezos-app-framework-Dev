import axios from "axios";

// storage interaction
export const fetchStorage = async () => {
  const res = await axios.get(
    `https://api.ghostnet.tzkt.io/v1/contracts/${
      import.meta.env.VITE_SMART_CONTRACT_URL
    }/storage`
  );
  return res.data;
};
