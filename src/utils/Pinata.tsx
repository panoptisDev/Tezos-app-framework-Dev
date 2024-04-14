export async function uploadImageUrlToIPFS(imageUrl: string, name: string) {
  try {
    // Download the image from the URL
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Create a FormData object to store the image

    const formData = new FormData();

    formData.append("file", blob);
    const metadata = JSON.stringify({
      name: name,
    });
    formData.append("pinataMetadata", metadata);
    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
      },
      body: formData,
    });

    const data = await res.json();
    const ImgHash = `ipfs://${data.IpfsHash}`;
    return ImgHash;
  } catch (error) {
    console.error("Error uploading image URL to IPFS:", error);
    return null;
  }
}
