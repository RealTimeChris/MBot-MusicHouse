// CommandIndex.ts - Module for my commands index.
// Mar 24, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import FoundationClasses from './FoundationClasses';

const botCommands = new Map<string, FoundationClasses.BotCommand>();
import botinfo from './commands/botinfo';
botCommands.set(botinfo.name, botinfo);
import clear from './commands/clear';
botCommands.set(clear.name, clear);
import deletedbentry from './commands/deletedbentry';
botCommands.set(deletedbentry.name, deletedbentry);
import displayguildsdata from './commands/displayguildsdata';
botCommands.set(displayguildsdata.name, displayguildsdata);
import djrole from './commands/djrole';
botCommands.set(djrole.name, djrole);
import editplaylist from './commands/editplaylist';
botCommands.set(editplaylist.name, editplaylist);
import help from './commands/help';
botCommands.set(help.name, help);
import listdbguilds from './commands/listdbguilds';
botCommands.set(listdbguilds.name, listdbguilds);
import loop from './commands/loop';
botCommands.set(loop.name, loop);
import loopsong from './commands/loopsong';
botCommands.set(loopsong.name, loopsong);
import message from './commands/message';
botCommands.set(message.name, message);
import musichouseoptions from './commands/musichouseoptions';
botCommands.set(musichouseoptions.name, musichouseoptions);
import play from './commands/play';
botCommands.set(play.name, play);
import playrn from './commands/playrn';
botCommands.set(playrn.name, playrn);
import setbordercolor from './commands/setbordercolor';
botCommands.set(setbordercolor.name, setbordercolor);
import setmusicchannel from './commands/setmusicchannel';
botCommands.set(setmusicchannel.name, setmusicchannel);
import shuffle from './commands/shuffle';
botCommands.set(shuffle.name, shuffle);
import skip from './commands/skip';
botCommands.set(skip.name, skip);
import slashcommands from './commands/slashcommands';
botCommands.set(slashcommands.name, slashcommands);
import stop from './commands/stop';
botCommands.set(stop.name, stop);
import test from './commands/test';
botCommands.set(test.name, test);

export default botCommands as Map<string, FoundationClasses.BotCommand>;
