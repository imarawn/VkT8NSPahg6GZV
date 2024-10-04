if ($kv.get('owner', 'aravvn') === 'hannasthesia' || $app.version === 'Testbed'){
let userlist = getUserList()
if ($message.orig.startsWith(commands.PREFIX)) $message.setSpam(true)
if(userlist[$user.username]) $message.setBody(`${userlist[$user.username].symbol} ${userlist[$user.username].prefix !== '' ?`[${userlist[$user.username].prefix}] `: ''}` + $message.orig)
if(userlist[$user.username] && userlist[$user.username].fourth) $message.setSpam(true)
}
