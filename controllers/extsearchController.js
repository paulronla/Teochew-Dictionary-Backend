const pinyinChaoyinDict = require('../data/mandarin_teochew.json');
const teochewAudioDict = require('../data/chaoyin_audio_map.json');

exports.genPartialDict = function (req, res) {
    res.json({ pinyinChaoyinDictRes: {}, teochewAudioDictRes: {} });
};
