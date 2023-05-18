import request from 'request'
import convert from 'xml-js';
const key = '4d66634f6a776c7436315456716566'
const fff = `http://openapi.seoul.go.kr:8088/4d66634f6a776c7436315456716566/xml/citydata/1/5/광화문·덕수궁`;
const url = `http://openapi.seoul.go.kr:8088/${key}/xml/dcitydata/1/5/광화문·덕수궁`;
const encodedUrl = 'http://openapi.seoul.go.kr:8088/' + encodeURIComponent(key) + '/xml/citydata/1/5/' + encodeURIComponent('광화문·덕수궁');
const options = {
    compact: true,
    ignoreAttributes: true,
    ignoreComment: true,
    spaces: 4,
    // strict: false, // 추가
};
request(encodedUrl, function (error, response, body) {
    // parse 보다 먼저 변수 선언하고 초기화
    let jsonData = {};
    if (error) throw new Error(error);
    jsonData = JSON.parse(convert.xml2json(body, options));
    console.log(jsonData['SeoulRtd.citydata']['CITYDATA']['AREA_NM']['_text']);
});