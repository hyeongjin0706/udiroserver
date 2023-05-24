import { CoolsmsMessageService } from "coolsms-node-sdk";

const apiKey = "ENTER_YOUR_API_KEY";
const apiSecret = "ENTER_YOUR_API_SECRET";
const client = new CoolsmsMessageService({
  apiKey: apiKey,
  apiSecret: apiSecret
});

// 단일 발송 예제
client.sendOne({
  to: "수신번호",
  from: "계정에서 등록한 발신번호 입력",
  text: "한글 45자, 영자 90자 이하 입력되면 자동으로 SMS타입의 메시지가 발송됩니다."
}).then(res => console.log(res));