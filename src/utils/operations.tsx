import { tezos } from "./tezos";
import { char2Bytes } from "@taquito/utils";

export const mintNFT = async (
  name: string,
  imageUrl: string,
  address: string
) => {
  try {
    const contract = await tezos.wallet.at(
      import.meta.env.VITE_SMART_CONTRACT_URL
    );
    const IPFSUrlOfImage = char2Bytes(imageUrl);

    const op = await contract.methods
      .mint(address, IPFSUrlOfImage, name)
      .send();
    return op.confirmation();
  } catch (error) {
    console.error(error);
  }
};
