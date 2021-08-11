export interface JSONDB {
	roles: UnitRoleInfo[],
	channel: string,
	messageID: string,
}

interface UnitRoleInfo {
	alias: string,
	id: string,
}