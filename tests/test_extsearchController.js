'use strict';

const rewire = require('rewire');
const rewiredSearchCont = rewire('../controllers/extsearchController.js');
const genPartialPinyinChaoyinDict = rewiredSearchCont.__get__('genPartialPinyinChaoyinDict');
const genPartialTeochewAudioDict = rewiredSearchCont.__get__('genPartialTeochewAudioDict');
const assert = require('assert').strict;

const helloworld = {
    "你":{"ni3":"le2"},
    "好":{"hao3":"ho2(白)|hoh4(白)|haon3|hao2(文)","hao4":"haon3|hao2(文)"},
    "世":{"shi4":"si3"},
    "界":{"jie4":"gai3(文)|goi3(白)"}
};

assert.deepStrictEqual(
    genPartialPinyinChaoyinDict('你好世界', '你好世界'),
    helloworld
);

assert.deepStrictEqual(
    genPartialTeochewAudioDict(helloworld),
    {
        "le2":"1100_6F088E2A",
        "le6":"1102_C2FCBD84",
        "ho2":"0797_F3530784",
        "ho6":"0801_4626694B",
        "hoh4":"0799_ECE60E71",
        "hoh8":"0803_92A35539",
        "haon3":"0727_D9E0A3ED",
        "hao5":"0724_8F5C46F1",
        "hao2":"0722_FD8C7B0F",
        "hao6":"0725_6622DE35",
        "si3":"1596_CB06A3A2",
        "si5":"1598_03067F3F",
        "gai3":"0504_5D1569AD",
        "gai5":"0505_932484F2",
        "goi3":"0620_65221F5D",
        "goi5":"0622_6B44B4FD"
    }
);

const familyName = {"罗":{"luo2":"lo5"}};

assert.deepStrictEqual(
    genPartialPinyinChaoyinDict('罗','羅'),
    familyName
);

assert.deepStrictEqual(
    genPartialTeochewAudioDict(familyName),
    {"lo5":"1148_DE5720BC","lo7":"1149_F8350D11"}
);

const rock = {"礐":{"que4":"gag4"}};

assert.deepStrictEqual(
    genPartialPinyinChaoyinDict('𬒈', '礐'),
    rock
);

assert.deepStrictEqual(
    genPartialTeochewAudioDict(rock),
    {"gag4":"0514_E3657619","gag8":"0516_4AFD7FFA"}
);
