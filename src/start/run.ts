import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import config from "../../config/config.js";

const run = async (app: any) => {
  if (config.ConnectionString) {
    await connect(config.ConnectionString);
  } else {
    console.error("ConnectionString is required");
  }
  const PORT: number = config.PORT;  
  
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
};
export default run;
