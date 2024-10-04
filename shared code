const getUserList = () => $kv.get('userdict', {});
const setUserList = (args) => $kv.set('userdict', args);

const defaultUserObj = {
  prefix: '',
  tokens: 0,
  participant: false,
  points: 0,
  fourth: false,
  symbol: ''
};

const commands = {
  PREFIX: '/',
  SETTOKENS: 'settk',
  SETPOINTS: 'setpt',
  SETNICKNAME: 'nn',
  CLEARUSERDICT: '!clear',
  GETKVVALUES: 'kv',
  SET4TH: 'set4th',
  GETINDIVIDUALINFO: 'info',
  TOP10: 'top',
  HELP: 'help',
  NNLIST: 'nnlist',
  PLAYGAME: 'play',
  LEAVEGAME: 'out',
  NEWGAME: 'newgame',
  LETTERLIST: 'llist',
  KICKPLAYER: 'cheater',
  REM4TH: 'rem4th',
  STOPGAME: 'stopgame',
  STARTGAME: 'startgame',
  FREEGUESS: 'guess',
  REDEEM: 'redeem',
  POINTMENU: 'pointmenu'
}

const messages = (command) => {
  switch (command) {
    case 'helpMessageOwner':
      return `The availabile commands for you are:\n${commands.PREFIX + commands.SETTOKENS} <username amount> - to set someones token amount\n${commands.PREFIX + commands.SETNICKNAME} <username nickname> - to set someones nickname\n${commands.PREFIX + commands.SET4TH} <username> - to flag someone as snowman and hide his messages from chat for other users than yourself\n${commands.PREFIX + commands.TOP10} - to show a list with the 50 highest tippers and their token amount\n${commands.PREFIX + commands.NNLIST} - sends a list with all Users that got a nickname\n${commands.PREFIX + commands.NEWGAME} - resets the hangman game`
    case 'helpmessageuser':
      return `The availabile commands for you are:\n${commands.PREFIX + commands.GETINDIVIDUALINFO} - to show how many tokens you tipped so far`
    case 'getTopUsers':
      return GetTopUsers()
    case 'getNicknamedUsers':
      return GetNicknamedUsers()
    case 'set4th':
      return `{username} got added to the 4th list`
    case 'rem4th':
      return `{username} got removed from the 4th list`
    case 'successKickForKicker':
      return `{username} got kicked from the game and his points bla blab lanqiebdfileanorifiuoq`
    case 'successRedeem':
      return `{emote} {username} redeemed: {tipoptions} {emote}`
    case 'successSetTokens':
      return `User {username} got updated and has a token count of {tokenAmount} tokies now`
    case 'successSetPoints':
      return `User {username} got updated and has a point count of {pointAmount} points now`
    case 'successSetNickName':
      return `User {username} got updated and has the prefix {prefix} now`
    case 'succsessIndividualInfo':
      return `You tipped {tokens} tokens\nand have {points} points`
  }
}

const staticMessages = {
  errorAddParticipant: 'There is no game going on right now' /*dude be real we dont do games here go somewhere else we dont want you here anyways'*/,
  successAddParticipant: `You have been added to the participants`,

  errorLeaveGame: 'You cant leave something that isnt there' /*, opposite to your dad who left you when you were not even born',
  successLeaveGame: `You have been removed from the participants` */,

  errorKickuser: 'Darling, in case you forgot, we dont have a game going on right now so there would not be the slightest point to punish someone for somehting he clearly didnt do.',
  successKickForKicked: 'You got kicked form the game and your points got resetted',

  successNewWord: 'New Word has been set',
  errorNewWord: 'You have to provide a Word',


  errorRedeemNoGameRunning: 'Prizes can only be redeemed when a game is running',
  errorRedeemInvalidamount: 'Invalid amount provided',
  errorRedeemNonsufficientFunds: 'You dont have enough points to redeem this prize',
  errorRedeemNoItem: 'There is no prize with that amount to redeem',

  errorNoPermission: 'You are not allowed to use commands here :dav-shallnotpass',
  errorSetTokensArgsMissing: 'You have to provide a username and a token amount',
  errorSetPointsArgsMissing: 'You have to provide a username and a point amount',
  errorSetNickNameArgsMissing: 'You have to provide a username and a prefix',
  errorCommandNotAllowed: 'This command isnt allowed here',
  errorNoCommand: 'This is not a command',

  successGameStopped: 'The game has been stopped',
  errorGameStopped: 'There is no game running',
  successGameStarted: 'The Game has been started',
  errorGameStarted: 'There is already a game running',

  successFreeGuess: 'You successfully submitted your free guess, you little freeloader, not even want to tip for the stuff you are getting here',


}

//---------UTILITY------------

const notice = (message, recipient = '') => $room.sendNotice(message, { toUsername: recipient })

const createOrUpdateUser = (username, userData = {}) => {
  const userList = getUserList();

  if (!userList[username]) {
    const newUser = {
      ...defaultUserObj,
      ...userData,
    };

    userList[username] = newUser;
    setUserList(userList);
    return
  }

  const existingUser = userList[username];

  const updatedUser = {
    ...existingUser,
    ...userData,
  };

  if (JSON.stringify(existingUser) === JSON.stringify(updatedUser)) {
    return
  }

  userList[username] = updatedUser;
  setUserList(userList);
  return
};

const addTokies = (username, amount) => {
  const userList = getUserList();

  if (!userList[username]) {
    userList[username] = defaultUserObj
  }
  userList[username].tokens += amount
  setUserList(userList)
  if ($app.version === 'Testbed') $room.sendNotice(JSON.stringify(getUserList()))
}

const getuserRanks = () => $kv.get('ranks', {})

const createUserRanks = (settings) => {
  let result = {}
  let rankpairs = settings.split(',')

  rankpairs.forEach(pair => {
    let [symbol, amount] = pair.split(';')
    result[amount] = symbol
  })
  $kv.set('ranks', result)
}

function checkRange(value, ranges) {
  let sortedAmounts = Object.keys(ranges).map(Number).sort((a, b) => a - b);

  for (let i = 0; i < sortedAmounts.length; i++) {
    let currentAmount = sortedAmounts[i];
    let nextAmount = sortedAmounts[i + 1] || Infinity;

    if (value >= currentAmount && value < nextAmount) {
      return ranges[currentAmount];
    }
  }
  return '';
}

const GetTopUsers = () => {
  const userDictionary = getUserList()

  const userArray = Object.entries(userDictionary);

  userArray.sort((a, b) => b[1].tokens - a[1].tokens);

  const topTipper = userArray.slice(0, 50);

  let message = `${$room.owner}´s Top Lovers:\n`;
  topTipper.forEach((entry, index) => {
    const username = entry[0];
    const tokens = entry[1].tokens;
    const points = entry[1].points
    message += `${index + 1}. ${username}: ${tokens} tokens and ${points} points\n`;
  });
  message = message.slice(0, -1)

  return [message, $user.username]
}

const GetNicknamedUsers = () => {
  const userDictionary = getUserList()

  const userArray = Object.entries(userDictionary);

  let message = `Nicknamed Users:\n`;
  userArray.forEach((entry) => {
    const username = entry[0];
    const prefix = entry[1].prefix;
    if (prefix !== '') {
      message += `${username}: ${prefix}\n`;
    }
  });
  message = message.slice(0, -1)

  return [message, $user.username]
}

const set4th = (username) => {
  createOrUpdateUser(username, { fourth: true })
  let message = messages('set4th').replace('{username}', username)
  return message
}

const rem4th = (username) => {
  createOrUpdateUser(username, { fourth: false })
  let message = messages('rem4th').replace('{username}', username)
  return message
}

//----------HANGMAN----------

const letterTip = 5
const wordTip = 10
const penalty = -10
const correctletter1 = 1
const correctletter2 = 0.5
const correctword1 = 3
const correctword2 = 1.5
const delay = 30 * 1000
const gamerunning = () => $kv.get('gamerunning', false)
const letterTemplate = { COUNT: 0, TIME: 0, USERS: [] }

const menuentries = 20
let emote = $settings.pointmemote || ''

const getWord = () => $kv.get('word', {})
const setword = (wordobject) => $kv.set('word', wordobject)

const addParticipant = (username) => {
  if (!gamerunning()) return [staticMessages.errorAddParticipant, $user.username]
  createOrUpdateUser(username, { participant: true })
  return [staticMessages.successAddParticipant, $user.username]
}

const removeParticipant = (username) => {
  if (!gamerunning()) return [staticMessages.errorLeaveGame, $user.username]
  createOrUpdateUser(username, { participant: false })
  return [staticMessages.successLeaveGame, $user.username]
}

const kickParticipant = (username) => {
  if (!gamerunning()) return [staticMessages.errorKickuser, $user.username]
  createOrUpdateUser(username, { participant: false, points: penalty })
  $room.sendNotice(messages('successKickForKicker').replace('{username}', username), { toUsername: $user.username })
  return [staticMessages.successKickForKicked, username]
}

const handleGuess = (guess) => {
  let word = getWord()
  let userlist = getUserList()
  if (guess.length > 1 && !word.USERS.includes($user.username)) {
    if (guess === word.WORD && word.COUNT === 0) {
      userlist[$user.username].points += correctword1
      word.TIME = Date.now()
      word.COUNT = 1
      word.USERS.push($user.username)
    } else if (guess === word.WORD && word.COUNT >= 1) {
      if (guess === word.WORD && Date.now() - word.TIME < delay) {
        userlist[$user.username].points += correctword2
        word.COUNT += 1
        word.USERS.push($user.username)
      } else if (guess === word.WORD && Date.now() - word.TIME >= delay) {
        word.COUNT += 1000
        word.USERS.push($user.username)
      }
    }
  }
  if (guess.length === 1 && word.WORD.includes(guess) && !(word.USERS.includes($user.username) || word.WORDARRAY[guess].USERS.includes($user.username))) {
    if (word.WORDARRAY[guess].COUNT === 0) {
      word.WORDARRAY[guess].COUNT = 1
      word.WORDARRAY[guess].TIME = Date.now()
      userlist[$user.username].points += correctletter1
      word.WORDARRAY[guess].USERS.push($user.username)
    } else if (word.WORDARRAY[guess].COUNT >= 1) {
      if (Date.now() - word.WORDARRAY[guess].TIME >= delay) {
        word.WORDARRAY[guess].COUNT += 1000
        word.WORDARRAY[guess].USERS.push($user.username)
      } else if (Date.now() - word.WORDARRAY[guess].TIME < delay) {
        if (Date.now() - word.WORDARRAY[guess].TIME <= delay) {
          word.WORDARRAY[guess].COUNT += 1
          userlist[$user.username].points += correctletter2
          word.WORDARRAY[guess].USERS.push($user.username)
        }
      }
    }
  }
  setword(word)
  setUserList(userlist)
  return
}

function handleTipnote(note) {
  let tipnotearray = note.split(' ')
  let guess = tipnotearray.shift()
  return guess.toUpperCase()
}

function addLettersToWordArray(inputWord) {
  if (inputWord === (undefined || '')) return staticMessages.errorNewWord
  const newWord = { WORD: inputWord.toUpperCase(), WORDARRAY: {}, TIME: 0, COUNT: 0, USERS: [] };

  for (let i = 0; i < inputWord.length; i++) {
    const char = inputWord[i];

    const letter = { ...letterTemplate };

    newWord.WORDARRAY[char.toUpperCase()] = letter;
  }
  setword(newWord)
  return staticMessages.successNewWord
}

const stopGame = () => {
  let userDictionary = getUserList()
  const userArray = Object.entries(userDictionary)
  userArray.forEach((entry) => {
    entry[1].participant = false
  })
  setUserList(userDictionary)
}

const createPointMenu = () => {
  let PointMenuTips = {}
  for (let i = 1; i <= menuentries; i++) {
    let setting = $settings[`pointmenu${i}`];
    if (setting === null || setting === '') continue
    const [key, value] = setting.split(";");
    if (key === undefined || value === undefined) continue
    if (isNaN(parseInt(value))) continue
    PointMenuTips[parseInt(value)] = key
  }
  $kv.set("pointMenuTips", PointMenuTips)
  let menuMessage = `${emote} ${$settings.pointmenutitle} ${emote}\n`;
  let str = ''
  const menuItems = PointMenuTips
  for (const value in menuItems) {
    str = menuItems[value]
    menuMessage += ` ${emote} ${str} (${value})\n`
  }
  menuMessage = menuMessage.slice(0, -1)
  $kv.set('menumessage', menuMessage)
}

const handleRedeemCommand = (amount) => {
  if (!$kv.get('gamerunning', false)) return [staticMessages.errorRedeemNoGameRunning, $user.username]
  amount = parseInt(amount)
  if (isNaN(amount) || amount <= 0) return [staticMessages.errorRedeemInvalidamount, $user.username];
  let userlist = getUserList()
  let userpoints = userlist[$user.username].points
  if (userpoints < amount) return [staticMessages.errorRedeemNonsufficientFunds, $user.username]
  let tipoptions = $kv.get('pointMenuTips', {})
  if (!tipoptions[amount]) return [staticMessages.errorRedeemNoItem, $user.username]
  userlist[$user.username].points -= amount / 2
  setUserList(userlist)
  return [messages('successRedeem').replaceAll('{emote}', emote).replace('{username}', $user.username).replace('{tipoptions}', tipoptions[amount]), '']
}

//----------COMMANDS---------

const handleCommands = (message) => {
  let args = message.split(' ');
  let slashCommand = args.shift();

  switch (slashCommand) {
    case commands.PREFIX + commands.PLAYGAME:
      return addParticipant($user.username)
    case commands.PREFIX + commands.LEAVEGAME:
      return removeParticipant($user.username)
  }

  if (!($user.isOwner || getUserList()[$user.username])) {
    return [staticMessages.errorNoPermission, $user.username];
  }

  const cleanUsername = (username) => {
    return username.startsWith("@") ? username.slice(1) : username
  }

  if ($user.isOwner || (getUserList()[$user.username] && getUserList()[$user.username].fourth)) {
    switch (slashCommand) {
      case commands.PREFIX + commands.SETTOKENS: {
        if (args.length !== 2) return [staticMessages.errorSetTokensArgsMissing, $user.username];
        let username = cleanUsername(args[0]);
        let tokenAmount = parseInt(args[1]);
        createOrUpdateUser(username, { tokens: tokenAmount });
        if ($app.version === 'Testbed') $room.sendNotice(JSON.stringify(getUserList()));
        return [messages('successSetTokens').replace('{username}', username).replace('{tokenAmount}', tokenAmount), $user.username];
      }

      case commands.PREFIX + commands.SETPOINTS: {
        if (args.length !== 2) return [staticMessages.errorSetPointsArgsMissing, $user.username];
        let username = cleanUsername(args[0]);
        let pointAmount = parseInt(args[1]);
        createOrUpdateUser(username, { points: pointAmount });
        if ($app.version === 'Testbed') $room.sendNotice(JSON.stringify(getUserList()));
        return [messages('successSetPoints').replace('{username}', username).replace('{pointAmount}', pointAmount), $user.username];
      }

      case commands.PREFIX + commands.SETNICKNAME: {
        if (args.length !== 2) return [staticMessages.errorSetNickNameArgsMissing, $user.username];
        let username = cleanUsername(args[0]);
        let prefix = args[1];
        createOrUpdateUser(username, { prefix: prefix });
        if ($app.version === 'Testbed') $room.sendNotice(JSON.stringify(getUserList()));
        return [messages('successSetNickName').replace('{username}', username).replace('{prefix}', prefix), $user.username];
      }

      case commands.PREFIX + commands.CLEARUSERDICT:
        if ($app.version === 'Testbed') {
          $kv.remove('userdict');
          return ['Success', $user.username];
        }
        return [staticMessages.errorCommandNotAllowed, $user.username]

      case commands.PREFIX + commands.GETKVVALUES:
        if ($app.version === 'Testbed') {
          return [`${JSON.stringify(getuserRanks())}\n ${JSON.stringify(getUserList())}\n${$kv.get('gamerunning', false)}\n${JSON.stringify($kv.get('pointMenuTips', {}))}`, ''];
        }
        return [staticMessages.errorCommandNotAllowed, $user.username]

      case commands.PREFIX + commands.SET4TH: {
        const cleanedUsername = cleanUsername(args[0]);
        return [set4th(cleanedUsername), $user.username];
      }

      case commands.PREFIX + commands.REM4TH: {
        const cleanedUsername = cleanUsername(args[0]);
        return [rem4th(cleanedUsername), $user.username];
      }

      case commands.PREFIX + commands.TOP10:
        return messages('getTopUsers')

      case commands.PREFIX + commands.HELP:
        return [messages('helpMessageOwner'), $user.username]

      case commands.PREFIX + commands.NNLIST:
        return messages('getNicknamedUsers')

      case commands.PREFIX + commands.NEWGAME:
        return [addLettersToWordArray(args[0]), $user.username]

      case commands.PREFIX + commands.KICKPLAYER:
        return kickParticipant(cleanUsername(args[0]))

      case commands.PREFIX + commands.STOPGAME: {
        if (!$kv.get('gamerunning', false)) return [staticMessages.errorGameStopped, $user.username]
        $kv.set('gamerunning', false)
        stopGame()
        return [staticMessages.successGameStopped, $user.username]
      }
      case commands.PREFIX + commands.STARTGAME: {
        if ($kv.get('gamerunning', false)) return [staticMessages.errorGameStarted, $user.username]
        $kv.set('gamerunning', true)
        return [staticMessages.successGameStarted, $user.username]
      }
    }
  }

  if ($user.inFanclub && $settings.fanclubguess && getUserList()[$user.username] && getUserList()[$user.username].participant) {
    switch (slashCommand) {
      case commands.PREFIX + commands.FREEGUESS: {
        handleGuess(handleTipnote(args[0]))
        return [staticMessages.successFreeGuess, $user.username]
      }
    }
  }

  if (!getUserList()[$user.username]) return [staticMessages.errorNoCommand, $user.username]
  switch (slashCommand) {
    case commands.PREFIX + commands.GETINDIVIDUALINFO:
      return [messages('succsessIndividualInfo').replace('{tokens}', getUserList()[$user.username].tokens).replace('{points}', getUserList()[$user.username].points), $user.username];

    case commands.PREFIX + commands.HELP:
      return messages('helpmessageuser')

    case commands.PREFIX + commands.REDEEM:
      return handleRedeemCommand(args[0])

    case commands.PREFIX + commands.POINTMENU:
      return [$kv.get('menumessage', ''), $user.username]

    default:
      return [staticMessages.errorNoCommand, $user.username];
  }
};
