const path = require('path');
const fse = require('fs-extra');

const srcDir = path.join(__dirname, '..', 'templates', 'js');
const destDir = path.join(process.cwd(), 'botmate');

try {
  fse.copySync(srcDir, destDir, { overwrite: true | false });
  fse.writeFileSync(path.join(destDir, '.env'), `DATABASE_URL=mongodb://localhost:27017/botmate`);

  console.log('Success! Run the following commands to get started:');
  console.log(`
    cd botmate
    npm install
    npm start
  `);

  console.log();
  console.log("Don't forget to update the .env file with your own values.");
} catch (err) {
  console.error(err);
}
