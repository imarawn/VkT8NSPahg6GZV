if ($room.owner === 'hannasthesia' || $app.version === 'Testbed') {
  $kv.set('owner', $room.owner)
  $room.sendNotice($app.version)
  createUserRanks($settings.rank)

  createPointMenu()
}
