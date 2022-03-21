// GuildData.ts - Module for my "guild data" class.
// Apr 6, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Level from 'level-ts';
import FoundationClasses from './FoundationClasses';

/**
 * Class representing the startup values of a guild data structure.
 */
interface GuildDataInitData {
    dataBase: Level;
    id: string;
    memberCount: number;
    name: string;
}

/**
 * Class representing a single guild/server.
 */
export default class GuildData extends FoundationClasses.DiscordEntity {
    public static readonly guildsData: Map<string, GuildData> = new Map<string, GuildData>();
    public readonly dataBase: Level;
    public readonly dataBaseKey: string;
    public readonly guildName: string;
    public readonly id: string;
    public readonly memberCount: number;
    public borderColor: [number, number, number] = [254, 254, 254];
    public djRoleID: string = '';
    public musicChannelIDs: string[] = [];
    public playlist: FoundationClasses.Playlist = {songs:[], currentSong:{name:'', url: '', 
        thumbnailURL:'', addedBy:'', id:''}, volume:5, voiceChannel: null, textChannel: null, 
        loopAll: false, loopSong:false, playNext: true};

    public async getFromDataBase(): Promise<void> {
        try{
            const guildData = await this.dataBase.get(this.dataBaseKey) as GuildData;
            this.borderColor = guildData.borderColor;
            this.djRoleID = guildData.djRoleID;
            this.musicChannelIDs = guildData.musicChannelIDs;
            this.playlist = guildData.playlist;
        }
        catch(error) {
            if (error.type === 'NotFoundError') {
                console.log(`No entry found for guild by the Id of ${this.id} with name of ${this.guildName}, creating one!`);
                console.log(this);
            }
        }
    }
    public async writeToDataBase(): Promise<void> {
        if (this.guildName === '') {
            const error = new Error();
            error.name = "Non-Initialized Structure";
            error.message = "You've forgotten to initialize the GuildData structure!";
            throw error;
        }
        console.log('Updating database values for guild: ' + this.guildName);
        await this.dataBase.put(this.dataBaseKey, this);
        GuildData.guildsData.set(this.dataBaseKey, this);
    }
    constructor(initData: GuildDataInitData) {
        super();
        const IdRegExp = /\d{17,18}/;
        this.dataBase = initData.dataBase;
        this.guildName = initData.name.trim();
        this.id = initData.id.trim();
        this.memberCount = initData.memberCount;
        if (!IdRegExp.test(this.id)) {
            const error = new Error();
            error.name = "Guild Id Issue";
            error.message = "You've passed an invalid guild Id to the constructor:\n" + this.id;
            throw error;
        }
        this.dataBaseKey = this.id;
    }
}
