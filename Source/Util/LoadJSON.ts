import { readFile } from "fs/promises";

export default async function loadJSON(path: string) {
	const data = (await readFile(path)).toString();

	return JSON.parse(data);
}