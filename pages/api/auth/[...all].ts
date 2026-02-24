import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth";

export const config = { api: { bodyParser: false } };
export const runtime = "nodejs";

export default toNodeHandler(auth);
