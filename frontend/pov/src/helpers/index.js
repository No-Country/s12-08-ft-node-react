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

export function convertirImagenABase64(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}
