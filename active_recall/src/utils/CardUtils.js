const getCardBackData = ({ textContent, canvasRef }) => {
  let imageData = "";
  let textData = "";
  if (textContent.current.length > 0) {
    let div = document.createElement("div");
    div.innerHTML = textContent.current;
    const images = div.getElementsByTagName("img");
    //imageData = getImageData(images);
    textData = div.getHTML();
  }
  return {
    //imageData: imageData,
    canvasData: getCanvasData(canvasRef),
    textData: textData,
  };
};

const getImageData = (images) => {
  /*   if (images) {
    let imageData = getLocalStorage("ImageData") || {};
    for (let i = 0; i < images.length; i++) {
      const imageId = `image-${Date.now()}`;
      imageData[imageId] = images[i].src;
      images[i].id = imageId;
      images[i].src = "";
    }
    return imageData;
  }
  return ""; */
};

const getCanvasData = (canvasRef) => {
  const canvas = canvasRef.current;
  const dataURL = canvas.toDataURL();
  return dataURL;
};

export const getCardData = (cardInputs) => {
  const { imageData, textData } = getCardBackData(cardInputs);
  const cardData = {
    header: cardInputs.header,
    briefstatement: cardInputs.briefstatement,
    text: textData,
    recall: 1,
  };
  return cardData;
};
