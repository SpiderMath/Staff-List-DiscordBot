import { config } from "dotenv";
import StaffListerClient from "./Base/Client";
config();

new StaffListerClient()
	.start();