import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream Api Key or Secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export async function upsertStreamUser(userData) {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (err) {
    console.error("Error upserting Stream user:", err);
  }
}
export async function generateStreamToken(userId) {
  try {
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (err) {
    console.error("Error generating Stream token:", err);
  }
}
