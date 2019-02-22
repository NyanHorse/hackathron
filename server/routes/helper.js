const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/spacecats';

module.exports = async function getData(query) {
  const data = [];
  let error = null;

  await new Promise((resolve, reject) => {
    pg.connect(connectionString, (err, client, done) => {
      if(err) {
        done();
        error = err;
        resolve();
      }
      const q = client.query(query);
      q.on('row', (row) => {
        data.push(row);
      });
      
      q.on('end', () => { 
        done(); 
        resolve();
      });
    });
  });

  return { data, error };

};