// src/components/Message.jsx

export function Message({ text, isUser }) {
    console.log(text)
    return (
        <div className={`flex mb-2 p-4 justify-${isUser ? 'end' : 'start'}`}>
            <div className={`${isUser ? "bg-blue-500 text-white rounded-br-none rounded-lg p-1" : "bg-gray-300 text-black rounded-br-none rounded-lg px-4 py-2"}`} >
                {text}
            </div>
        </div >
    );
}
