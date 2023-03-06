import api from "../config/chatgpt.config";
const handleMessage = async (message, callback) => {
    const res = await api.sendMessage(message);
    callback(null, res.text);
};
export default handleMessage;
