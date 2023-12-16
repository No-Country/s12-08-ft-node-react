// En un archivo separado, por ejemplo, fileUtils.js
export const fileToBase64 = (fileInput) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    if (fileInput.files && fileInput.files[0]) {
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      reject("No se ha seleccionado ningún archivo.");
    }
  });
};
