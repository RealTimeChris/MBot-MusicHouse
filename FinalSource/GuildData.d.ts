import FoundationClasses from './FoundationClasses';
import Level from 'level-ts';
/**
 * Class representing the startup values of a guild data structure.
 */
export interface GuildDataInitData {
    dataBase: Level;
    id: string;
    memberCount: number;
    name: string;
}
/**
 * Class representing a single guild/server.
 */
export default class GuildData extends FoundationClasses.DiscordEntity {
    static readonly guildsData: Map<string, GuildData>;
    readonly dataBase: Level;
    readonly dataBaseKey: string;
    readonly guildName: string;
    readonly id: string;
    readonly memberCount: number;
    borderColor: [number, number, number];
    djRoleID: string;
    musicChannelIDs: string[];
    playlist: FoundationClasses.Playlist;
    getFromDataBase(): Promise<void>;
    writeToDataBase(): Promise<void>;
    constructor(initData: GuildDataInitData);
}
