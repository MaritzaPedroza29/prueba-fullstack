import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth";
//import { auth } from "../../../lib/auth";
console.log("🔥 AUTH ROUTE SE ESTA EJECUTANDO");
console.log("🔥 auth.handler existe?", !!auth?.handler);

export const config = { api: { bodyParser: false } };

export default toNodeHandler(auth);