import { useState } from 'react';
import { toast } from 'react-hot-toast';

function MessageBar() {
    const [message, setMessage] = useState('');

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const loadingToastId = toast.loading('Cargando imagen...', {
                position: 'top-center',
            });

            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                toast.success('Carga exitosa!', { id: loadingToastId });
                console.log('Archivo cargado:', file);
            } catch (error) {
                toast.error('Error al cargar la imagen', { id: loadingToastId });
            }
        }
    };

    const handleSendMessage = () => {
        // Verifica si el campo de mensaje está vacío antes de enviar
        if (message.trim() === '') {
            toast.error('Por favor, escribe un mensaje antes de enviar.');
            return;
        }

        console.log('Mensaje enviado:', message);

        toast.promise(
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            }),
            {
                loading: 'Enviando mensaje...',
                success: () => {
                    setMessage('');
                    return 'Mensaje enviado con éxito!';
                },
                error: 'Error al enviar el mensaje.',
                position: 'top-center',
            }
        );
    };

    const handleTextareaChange = (e) => {
        if (e.target.value.length <= 60) {
            setMessage(e.target.value);
        }
    };

    return (
        <div className="message-bar-container ml-4 p-4 border border-none rounded relative">
            <div className="absolute -left-4 top-1 flex items-center ">
                <label htmlFor="file-upload" className="pt-8 pl-2 z-50 cursor-pointer">
                    <svg
                        width="35"
                        height="35"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="11"
                            stroke="#949494"
                            strokeWidth="2"
                            fill="none"
                        />
                        <path
                            d="M12 8V16M8 12H16"
                            stroke="#949494"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </label>
                <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileUpload}
                    className="hidden"
                />
            </div>
            <form className="flex items-center ml-4 rounded">
                <textarea
                    value={message}
                    onChange={handleTextareaChange}
                    placeholder="Escriba máximo 60 caracteres"
                    className="flex-1 text-center mt-3 pt-2 rounded"
                />
                <div className="ml-2">
                    <button
                        type="button"
                        onClick={handleSendMessage}
                        className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13 19V5L20.5 12L13 19ZM4 5H5.5V19H4V5Z"
                                fill="#FFFFFF"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MessageBar;
