// Disposable pilot with public fictional accounts. Never seed real credentials here.
const fs = require('node:fs/promises');
const path = require('node:path');
const { createServer } = require('../server');
const { createAuthStore } = require('../auth');

async function startPilot() {
  const demo = JSON.parse(await fs.readFile(path.join(__dirname, '../demo/data.json'), 'utf8'));
  const dbDir = process.env.STADIONHOPPER_DB_DIR || path.join(__dirname, '../.pilot-data');
  await fs.mkdir(dbDir, { recursive: true });
  const clubs = [], stadiums = [];
  function idFor(rows, field, name) {
    let row = rows.find(item => item.name === name);
    if (!row) { row = { [field]: rows.length + 1, name }; rows.push(row); }
    return row[field];
  }
  const matches = demo.matches.map(match => ({
    match_id: match.match_id, match_date: match.match_date, status: 'scheduled',
    home_club_id: idFor(clubs, 'club_id', match.home_club_name),
    away_club_id: idFor(clubs, 'club_id', match.away_club_name),
    stadium_id: idFor(stadiums, 'stadium_id', match.stadium_name)
  }));
  const tables = {
    'Clubs.json': clubs, 'Stadiums.json': stadiums, 'Matches.json': matches,
    'Users.json': demo.users.map(user => ({ user_id: user.user_id, username: user.username })),
    'Check_ins.json': [], 'Posts.json': []
  };
  for (const [file, rows] of Object.entries(tables)) {
    try { await fs.writeFile(path.join(dbDir, file), JSON.stringify(rows, null, 2) + '\n', { flag: 'wx' }); }
    catch (error) { if (error.code !== 'EEXIST') throw error; }
  }
  const server = createServer({ dbDir, authStore: createAuthStore({ users: demo.users }) });
  const host = process.env.HOST || '127.0.0.1';
  const port = Number(process.env.PORT) || 3000;
  server.listen(port, host, () => {
    console.log(`Pilot: http://${host}:${port}`);
    console.log('Fiktive kontoer: alex, sam, maria / stadion123');
    console.log('Delt pilotlagring: ' + dbDir);
  });
  return server;
}

if (require.main === module) startPilot().catch(error => { console.error(error); process.exitCode = 1; });
module.exports = { startPilot };
