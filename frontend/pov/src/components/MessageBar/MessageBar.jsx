import { useState } from "react";
import FileUpload from "../Svg/FileUpload";
import Send from "../Svg/Send";
import { toast } from "react-hot-toast";

function MessageBar() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleSendMessage = () => {
        if (!file && !message) {
            toast.error("Por favor, elija un archivo o escriba un mensaje.");
            return;
        }

        toast.success("Mensaje enviado con éxito");

        // Reinicia el estado del formulario
        setFile(null);
        setMessage("");
    };

    const handleFileUpload = () => {
        toast.info("Cargando archivo...");
    };

    return (
        <form className="justify-between h-[44px] mt-4 py-2 flex items-center bg-[#d9d9d9] rounded-full">
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

            <textarea
                type="text"
                placeholder="Escriba su mensaje aquí"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-transparent text-[12px] h-4 resize-none outline-none w-full"
            ></textarea>

            <div className="flex items-center mx-2">
                <button
                    type="button"
                    onClick={() => {
                        handleSendMessage(); // Llama a handleSendMessage primero
                        handleFileUpload(); // Luego a handleFileUpload
                    }}
                    className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
                >
                    <Send />
                </button>
            </div>
        </form>
    );
}

export default MessageBar;
