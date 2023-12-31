import { useState } from 'react';
import FileUpload from '../Svg/FileUpload';
import Send from '../Svg/Send';
import LoadingSpinner from '../Svg/LoadingSpinner';
import { useToken } from '../../hooks/useToken';
import { URL } from '../../router/routes';

function MessageBar() {
  const { token } = useToken();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const TOKEN = JSON.parse(token);



  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Mostrar vista previa de la imagen
    if (selectedFile) {
      const reader = new FileReader();

      setLoading(true);

      // Agregar un retraso de 2 segundos antes de mostrar la vista previa
      await new Promise((resolve) => setTimeout(resolve, 2000));

      reader.onloadend = () => {
        setLoading(false);
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(selectedFile);

      // Espera a que handleFileUpload termine antes de continuar
      await handleFileUpload();
    } else {
      setLoading(false);
      setImagePreview(null);
    }
  };


  const handleFileUpload = async () => {
    if (file) {
      try {
        setLoading(true);

        // Espera 2 segundos antes de simular la carga del archivo
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Acá se puede realizar cualquier acción adicional necesaria después de cargar el archivo

        setLoading(false);
      } catch (error) {
        // Maneja errores si es necesario
        setLoading(false);
      }
    }
  };

  
  const handleSendMessage = async (e, message) => {
    e.preventDefault();
    try {
      let data = {
        text: message,
        content: 'text',
      }
      if(imagePreview){
        data = {
          content: 'image',
          image: imagePreview,
        }
        if(message !== ''){
          data.text = message
        }
      }

      const response = await fetch(`${URL}/chats/chat`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      if(response.status === 201){
        setMessage('')
        setImagePreview(null)
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full py-2 flex items-center bg-white">
      <form onSubmit={(e) => handleSendMessage(e, message)} className="w-[90%] max-w-[780px] mx-auto h-[44px] py-2 flex justify-between items-center bg-[#d9d9d9] rounded-full">
        <label
          htmlFor="file-upload"
          className="btn btn-ghost btn-circle avatar px-0 hover:bg-transparent"
        >
          <div className="flex items-center">
            <FileUpload />
          </div>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Mostrar la vista previa de la imagen */}
        {loading ? (
          <div className="loading-indicator">
            <LoadingSpinner />
          </div>
        ) : (
          imagePreview && (
            <div className="image-preview p-1">
              <img
                src={imagePreview}
                alt="Vista previa"
                style={{
                  width: 35,
                  height: 35,
                  border: "2px solid rgb(100 116 139 / var(--tw-bg-opacity))",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </div>
          )
        )}

        <input
          type="text"
          placeholder="Escriba su mensaje aquí"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-transparent text-[12px] h-4 resize-none outline-none w-full"
        />

        <div className="flex items-center mx-2">
          <button
            type="submit"
            className="bg-[#5D73E9] text-white rounded-full p-2 hover:bg-[#3f3f2e]"
          >
            <Send />
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageBar;
