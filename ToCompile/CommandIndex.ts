// CommandIndex.ts - Module for my commands index.
// Mar 24, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import FoundationClasses from './FoundationClasses';

const botcommands = new Map<string, FoundationClasses.BotCommand>();

import clear from './commands/clear';
botcommands.set(clear.name, clear);
import deletedbentry from './commands/deletedbentry';
botcommands.set(deletedbentry.name, deletedbentry);
import djrole from './commands/djrole';
botcommands.set(djrole.name, djrole);
import editplaylist from './commands/editplaylist';
botcommands.set(editplaylist.name, editplaylist);
import help from './commands/help';
botcommands.set(help.name, help);
import listdbguilds from './commands/listdbguilds';
botcommands.set(listdbguilds.name, listdbguilds);
import loop from './commands/loop';
botcommands.set(loop.name, loop);
import loopsong from './commands/loopsong';
botcommands.set(loopsong.name, loopsong);
import message from './commands/message';
botcommands.set(message.name, message);
import musichouseoptions from './commands/musichouseoptions';
botcommands.set(musichouseoptions.name, musichouseoptions);
import play from './commands/play';
botcommands.set(play.name, play);
import playrn from './commands/playrn';
botcommands.set(playrn.name, playrn);
import setbordercolor from './commands/setbordercolor';
botcommands.set(setbordercolor.name, setbordercolor);
import setmusicchannel from './commands/setmusicchannel';
botcommands.set(setmusicchannel.name, setmusicchannel);
import shuffle from './commands/shuffle';
botcommands.set(shuffle.name, shuffle);
import skip from './commands/skip';
botcommands.set(skip.name, skip);
import slashcommands from './commands/slashcommands';
botcommands.set(slashcommands.name, slashcommands);
import stop from './commands/stop';
botcommands.set(stop.name, stop);
import test from './commands/test';
botcommands.set(test.name, test);

export default botcommands as Map<string, FoundationClasses.BotCommand>;
