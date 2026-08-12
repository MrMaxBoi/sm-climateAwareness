import { app } from "./backend/server.js";
import { connectDB } from "./backend/config/db.js";

const handler = async (req, res) => {
  await connectDB();
  return app(req, res);
};

export default handler;
