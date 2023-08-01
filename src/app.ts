import express from "express"; //  npm i @types/express -D
const app = express();

import modules from "./start/modules.js";
import start from "./start/run.js";
modules(app);
start(app);
