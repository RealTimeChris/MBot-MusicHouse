// CommandIndex.ts - Module for my commands index.
// Mar 24, 2021
// Chris M.
// https://github.com/RealTimeChris
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var botCommands = new Map();
var botinfo_1 = __importDefault(require("./commands/botinfo"));
botCommands.set(botinfo_1.default.name, botinfo_1.default);
var clear_1 = __importDefault(require("./commands/clear"));
botCommands.set(clear_1.default.name, clear_1.default);
var deletedbentry_1 = __importDefault(require("./commands/deletedbentry"));
botCommands.set(deletedbentry_1.default.name, deletedbentry_1.default);
var displayguildsdata_1 = __importDefault(require("./commands/displayguildsdata"));
botCommands.set(displayguildsdata_1.default.name, displayguildsdata_1.default);
var djrole_1 = __importDefault(require("./commands/djrole"));
botCommands.set(djrole_1.default.name, djrole_1.default);
var editplaylist_1 = __importDefault(require("./commands/editplaylist"));
botCommands.set(editplaylist_1.default.name, editplaylist_1.default);
var help_1 = __importDefault(require("./commands/help"));
botCommands.set(help_1.default.name, help_1.default);
var listdbguilds_1 = __importDefault(require("./commands/listdbguilds"));
botCommands.set(listdbguilds_1.default.name, listdbguilds_1.default);
var loop_1 = __importDefault(require("./commands/loop"));
botCommands.set(loop_1.default.name, loop_1.default);
var loopsong_1 = __importDefault(require("./commands/loopsong"));
botCommands.set(loopsong_1.default.name, loopsong_1.default);
var message_1 = __importDefault(require("./commands/message"));
botCommands.set(message_1.default.name, message_1.default);
var musichouseoptions_1 = __importDefault(require("./commands/musichouseoptions"));
botCommands.set(musichouseoptions_1.default.name, musichouseoptions_1.default);
var play_1 = __importDefault(require("./commands/play"));
botCommands.set(play_1.default.name, play_1.default);
var playrn_1 = __importDefault(require("./commands/playrn"));
botCommands.set(playrn_1.default.name, playrn_1.default);
var setbordercolor_1 = __importDefault(require("./commands/setbordercolor"));
botCommands.set(setbordercolor_1.default.name, setbordercolor_1.default);
var setmusicchannel_1 = __importDefault(require("./commands/setmusicchannel"));
botCommands.set(setmusicchannel_1.default.name, setmusicchannel_1.default);
var shuffle_1 = __importDefault(require("./commands/shuffle"));
botCommands.set(shuffle_1.default.name, shuffle_1.default);
var skip_1 = __importDefault(require("./commands/skip"));
botCommands.set(skip_1.default.name, skip_1.default);
var slashcommands_1 = __importDefault(require("./commands/slashcommands"));
botCommands.set(slashcommands_1.default.name, slashcommands_1.default);
var stop_1 = __importDefault(require("./commands/stop"));
botCommands.set(stop_1.default.name, stop_1.default);
var test_1 = __importDefault(require("./commands/test"));
botCommands.set(test_1.default.name, test_1.default);
exports.default = botCommands;
