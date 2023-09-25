import '../styles/Chat.css'

function ChatMessage({ data }) {
    const date = Date.parse(data['timestamp'])
    const dt = new Date(date)
    return (
        <div id="message">
            <b>
                {dt.getHours()}:{dt.getMinutes()}:{dt.getSeconds()} - {data["username"]}: 
            </b> { data["message"] }
        </div>
    );
}

export default ChatMessage;
