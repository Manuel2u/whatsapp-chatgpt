import api from "../config/chatgpt.config";

const handleMessage = async (message: any, callback: any) => {
  const res = await api.sendMessage(message);

  callback(null, res.text);
};


export default handleMessage