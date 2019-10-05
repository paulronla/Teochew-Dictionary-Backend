'use strict';

const pinyinChaoyinDict = require('../data/mandarin_teochew.json');
const teochewAudioDict = require('../data/chaoyin_audio_map.json');
const {genToneSandhiSingle} = require('../my_modules/playChaoyin');
const {mapInvalidChars} = require('../my_modules/genChaoyin');

exports.genPartialDict = function (req, res) {
    const partialDicts = { 
        pinyinChaoyinDictRes: genPartialPinyinChaoyinDict(
                                req.params.simpChin, req.params.tradChin), 
        teochewAudioDictRes: undefined
    };
    partialDicts.teochewAudioDictRes = genPartialTeochewAudioDict(
                                        partialDicts.pinyinChaoyinDictRes);

    res.json(partialDicts);
};

function genPartialPinyinChaoyinDict(simpChars, tradChars) {
    const validSimpChars = mapInvalidChars(simpChars);
    const validTradChars = simpChars.length === validSimpChars.length ? tradChars : mapInvalidChars(tradChars);
    const partialPinyinChaoyinDict = {};

    if (!pinyinChaoyinDict) {
        return partialPinyinChaoyinDict;
    }

    for (let i = 0; i < validSimpChars.length; i++) {
        const char = validSimpChars[i];

        if (pinyinChaoyinDict.hasOwnProperty(char)
                || pinyinChaoyinDict.hasOwnProperty(validTradChars[i])) {
            
            if (!partialPinyinChaoyinDict.hasOwnProperty(char)) {
                
                partialPinyinChaoyinDict[char] = pinyinChaoyinDict[char]
                        || pinyinChaoyinDict[validTradChars[i]];
            }
        }
    }

    return partialPinyinChaoyinDict;
}

function genPartialTeochewAudioDict(partialPinyinChaoyinDict) {
    const partialTeochewAudioDict = {};
    
    for (const char of Object.getOwnPropertyNames(partialPinyinChaoyinDict)) {
        const pinyinChaoyinMapping = partialPinyinChaoyinDict[char];

        for (const pinyin of 
                Object.getOwnPropertyNames(pinyinChaoyinMapping)) {
            
            const chaoyins = pinyinChaoyinMapping[pinyin].split('|')
                            .map(markedChaoyin => markedChaoyin.split('(')[0]);

            chaoyins.forEach(chaoyin => {
                if (!partialTeochewAudioDict.hasOwnProperty(chaoyin)
                        && teochewAudioDict.hasOwnProperty(chaoyin)) {
                    partialTeochewAudioDict[chaoyin] = teochewAudioDict[chaoyin];
                }

                const sandhiChaoyin = genToneSandhiSingle(chaoyin, teochewAudioDict);

                if (teochewAudioDict.hasOwnProperty(sandhiChaoyin)
                        && !partialTeochewAudioDict.hasOwnProperty(sandhiChaoyin)) {
                    partialTeochewAudioDict[sandhiChaoyin] 
                            = teochewAudioDict[sandhiChaoyin];
                }
            });
        }
    }

    return partialTeochewAudioDict;
}