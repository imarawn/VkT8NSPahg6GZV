if ($room.owner === 'hannasthesia' || $app.version === 'Testbed') {
  if (getUserList()[$user.username]) {
    let userTokens = getUserList()[$user.username].tokens;
    let userSymbol = checkRange(userTokens, getuserRanks());
    createOrUpdateUser($user.username, { symbol: userSymbol });
  }
}
