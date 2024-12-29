const fs = require('fs')
const { Telegraph } = require('./uploader');
const { getRandom, smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, delay, sleep } = require('./myfunc');
const { isSetWelcome, getTextSetWelcome } = require('./setwelcome');
const { isSetLeft, getTextSetLeft } = require('./setleft');
let set_welcome_db = JSON.parse(fs.readFileSync('./database/set_welcome.json'));
let set_left_db = JSON.parse(fs.readFileSync('./database/set_left.json'));
let setting = JSON.parse(fs.readFileSync('./config.json'));
const welcome2 = setting.auto_welcomeMsg;
const leave2 = setting.auto_leaveMsg;
const {
  proto,
  jidDecode,
  jidNormalizedUser,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  downloadContentFromMessage,
} = require('@whiskeysockets/baileys');
const moment = require('moment-timezone');
module.exports.welcome = async (iswel, isleft, NanoBotz, anu) => {
  try {
    const metadata = await NanoBotz.groupMetadata(anu.id);
    const participants = anu.participants;
    const memeg = metadata.participants.length;
    const groupName = metadata.subject;
    const groupDesc = metadata.desc;

    for (let num of participants) {
      const fkontaku = { key: { participant: `0@s.whatsapp.net`, ...(anu.id ? { remoteJid: `6283136505591-1614953337@g.us` } : {}) }, message: { 'contactMessage': { 'displayName': ``, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;,;;;\nFN:,\nitem1.TEL;waid=${num.split('@')[0]}:${num.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': setting.pathimg, thumbnail: setting.pathimg, sendEphemeral: true } } };

      try {
        pp_user = await NanoBotz.profilePictureUrl(num, 'image');
      } catch {
        pp_user = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg';
      }
      try {
        ppgroup = await NanoBotz.profilePictureUrl(anu.id, 'image');
      } catch {
        ppgroup = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg';
      }
      if (anu.action == 'add' && (iswel || setting.auto_welcomeMsg)) {
        console.log(anu);
        if (isSetWelcome(anu.id, set_welcome_db)) {
          var get_teks_welcome = await getTextSetWelcome(anu.id, set_welcome_db);
          var replace_pesan = (get_teks_welcome.replace(/@user/gi, `@${num.split('@')[0]}`));
          var full_pesan = (replace_pesan.replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc));
          NanoBotz.sendMessage(anu.id, { text: `${full_pesan}` });
        } else {
          var wc = await getBuffer(`https://telegra.ph/file/eaf642e46f00344e93a2c.png`);
          await NanoBotz.sendMessage(anu.id, {
            text: `Hallo @${num.split('@')[0]}\nSelamat Bergabung Di Group ${groupName},Jangan Lupa Intro Ya!\nPatuhi Rules Yang Ada\n\n.\n${groupDesc}\n`,
          }, {});
        }
      } else if (anu.action == 'remove' && (isleft || setting.auto_leaveMsg)) {
        console.log(anu);
        if (isSetLeft(anu.id, set_left_db)) {
          var get_teks_left = await getTextSetLeft(anu.id, set_left_db);
          var replace_pesan = (get_teks_left.replace(/@user/gi, `@${num.split('@')[0]}`));
          var full_pesan = (replace_pesan.replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc));
          NanoBotz.sendMessage(anu.id, { image: { url: pp_user }, mentions: [num], caption: `${full_pesan}` });
        } else {
          var lf = await getBuffer(`https://telegra.ph/file/a0a6f7bc72d1a6be0fa48.png`);
          await NanoBotz.sendMessage(anu.id, {
            text: `Dadah @${num.split('@')[0]}\nSelamat Tinggal Dari Group ${groupName}\n!\nPatuhi Rules Yang Ada\n\n.\n${groupDesc}\n`,
          }, {});
        }
      } else if (anu.action == 'promote') {
         NanoBotz.sendMessage(anu.id, {
            text: `Selamat @${num.split('@')[0]}\nKamu Telah Di promote Di ${groupName}\n`,
          }, {});
      } else if (anu.action == 'demote') {
         NanoBotz.sendMessage(anu.id, {
            text: `Selamat Ya @${num.split('@')[0]}\nKqmu telah Di Demote Dari${groupName}\n`,
          }, {});
      }
    }
  } catch (err) {
    console.log(err);
  }
};