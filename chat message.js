if ($room.owner === 'hannasthesia' || $app.version === 'Testbed'){
    let userlist = getUserList()
  if ($message.orig.startsWith(commands.PREFIX)) notice(handleCommands($message.orig)[0], handleCommands($message.orig)[1])
  if(userlist[$user.username] && userlist[$user.username].fourth && !$message.orig.startsWith(commands.PREFIX)) $room.sendNotice(`[MUTED] Carlos: ${userlist[$user.username].symbol} ${userlist[$user.username].prefix !== '' ?`[${userlist[$user.username].prefix}] `: ''}` + $message.orig, {toUsername: $room.owner, color: $settings.fouthcolor, bgColor: $settings.fourthbgcolor, fontWeight: $settings.fourthweight})

}
