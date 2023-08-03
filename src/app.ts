import express from "express"; 
const app = express();

import modules from "./start/modules.js";
import start from "./start/run.js";
modules(app);
start(app);
