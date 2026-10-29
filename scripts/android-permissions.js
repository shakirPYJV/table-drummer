// Adds the microphone permissions the game needs to the Android project.
// Runs automatically after `npm run android:add`. Safe to run again.
const fs = require('fs');
const file = 'android/app/src/main/AndroidManifest.xml';
if(!fs.existsSync(file)){ console.error('Android project not found. Run "npm run android:add" first.'); process.exit(1); }
let xml = fs.readFileSync(file, 'utf8');
const perms = ['android.permission.RECORD_AUDIO', 'android.permission.MODIFY_AUDIO_SETTINGS'];
let added = 0;
for(const p of perms){
  if(!xml.includes(`"${p}"`)){ xml = xml.replace('</manifest>', `    <uses-permission android:name="${p}" />\n</manifest>`); added++; }
}
fs.writeFileSync(file, xml);
console.log(added ? `Added ${added} microphone permission(s) to ${file}` : 'Microphone permissions already present.');

