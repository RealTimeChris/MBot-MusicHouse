// setmusicchannel.ts - Module for my "set music channel" command.
// Mar 14, 2021
// Chris M.
// https://github.com/RealTimeChris
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require("discord.js");
var GuildData_1 = __importDefault(require("../GuildData"));
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var command = {
    name: 'setmusicchannel',
    description: '__**Set Music Channel Usage**__ !setmusicchannel = ADD or !setmusicchannel = REMOVE in the channel you would like to add/remove.'
        + ' Also !setmusicchannel = PURGE to remove all channels, or just !setmusicchannel to view the currently enabled channels!',
    function: Function()
};
function execute(commandData, discordUser) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPermission, guildData, msgString, x, currentID, messageEmbed, msgString, msgEmbed, newGameChannel, msgString, msgEmbed, channelID, x, msgString, msgEmbed, messageEmbed, channelID, msgString, isItPresent, x, msgString_1, msgEmbed, messageEmbed, msgString, x, currentID, messageEmbed, error_1;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 30, , 31]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _f.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser)];
                case 2:
                    doWeHaveAdminPermission = _f.sent();
                    if (doWeHaveAdminPermission === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _f.sent();
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 5];
                    msgString = '__You have the following channels enabled for controlling music, on this server:__\n------\n';
                    for (x = 0; x < guildData.musicChannelIDs.length; x += 1) {
                        currentID = guildData.musicChannelIDs[x];
                        msgString += "__**Channel #" + x + ":**__ <#" + currentID + ">\n";
                    }
                    msgString += '------\n';
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date.now())
                        .setTitle('__**Music Channels Enabled:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 4:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 5:
                    if (!(commandData.args[0].toLowerCase() !== 'add' && commandData.args[0].toLowerCase() !== 'remove' && commandData.args[0].toLowerCase() !== 'purge' && commandData.args[0].toLowerCase() !== 'view')) return [3 /*break*/, 7];
                    msgString = "------\n**Please enter either 'add', 'remove', or 'purge' only! (!setmusicchannel = ADDorREMOVEorPURGE)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_a = commandData.guildMember) === null || _a === void 0 ? void 0 : _a.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 6:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 7:
                    if (!(commandData.args[0].toLowerCase() === 'add')) return [3 /*break*/, 16];
                    newGameChannel = commandData.fromTextChannel;
                    if (!(newGameChannel == null)) return [3 /*break*/, 9];
                    msgString = "------\n**Sorry, but that channel could not be found!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_b = commandData.guildMember) === null || _b === void 0 ? void 0 : _b.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Channel Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 8:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 9:
                    channelID = (_c = commandData.fromTextChannel) === null || _c === void 0 ? void 0 : _c.id;
                    x = 0;
                    _f.label = 10;
                case 10:
                    if (!(x < guildData.musicChannelIDs.length)) return [3 /*break*/, 13];
                    if (!(channelID === guildData.musicChannelIDs[x])) return [3 /*break*/, 12];
                    msgString = "------\n**That channel is already on the list of enabled channels!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_d = commandData.guildMember) === null || _d === void 0 ? void 0 : _d.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Already Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 11:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 12:
                    x += 1;
                    return [3 /*break*/, 10];
                case 13:
                    guildData.musicChannelIDs.push(channelID);
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 14:
                    _f.sent();
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date.now())
                        .setTitle('__**Music Channel Added:**__')
                        .setDescription("**You've succesfully added <#" + channelID + "> to your list of accepted music channels!**");
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 15:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 16:
                    if (!(commandData.args[0].toLowerCase() === 'remove')) return [3 /*break*/, 24];
                    channelID = '';
                    channelID = commandData.fromTextChannel.id;
                    msgString = '';
                    isItPresent = false;
                    x = 0;
                    _f.label = 17;
                case 17:
                    if (!(x < guildData.musicChannelIDs.length)) return [3 /*break*/, 20];
                    if (!(channelID === guildData.musicChannelIDs[x])) return [3 /*break*/, 19];
                    isItPresent = true;
                    guildData.musicChannelIDs.splice(x, 1);
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 18:
                    _f.sent();
                    msgString += "You've succesfully removed the channel <#" + channelID + "> from the list of enabled music channels!";
                    _f.label = 19;
                case 19:
                    x += 1;
                    return [3 /*break*/, 17];
                case 20:
                    if (!(isItPresent === false)) return [3 /*break*/, 22];
                    msgString_1 = "------\n**That channel is not present on the list of enabled music channels!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_e = commandData.guildMember) === null || _e === void 0 ? void 0 : _e.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Channel Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 21:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 22:
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date.now())
                        .setTitle('__**Music Channel Removed:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 23:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 24:
                    if (!(commandData.args[0].toLowerCase() === 'purge')) return [3 /*break*/, 29];
                    msgString = '';
                    if (!(guildData.musicChannelIDs.length > 0)) return [3 /*break*/, 26];
                    msgString = "__You've removed the following channels from your list of enabled music channels:__\n------\n";
                    for (x = 0; x < guildData.musicChannelIDs.length; x += 1) {
                        currentID = guildData.musicChannelIDs[x];
                        msgString += "__**Channel #" + x + ":**__ <#" + currentID + ">\n";
                    }
                    msgString += '------\n__**The music commands will now work in ANY CHANNEL!**__';
                    guildData.musicChannelIDs = [];
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 25:
                    _f.sent();
                    return [3 /*break*/, 27];
                case 26:
                    msgString += '**Sorry, but there are no channels to remove!**';
                    _f.label = 27;
                case 27:
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date.now())
                        .setTitle('__**Music Channels Removed:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 28:
                    _f.sent();
                    _f.label = 29;
                case 29: return [2 /*return*/, commandReturnData];
                case 30:
                    error_1 = _f.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 31: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
