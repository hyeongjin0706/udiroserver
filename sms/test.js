const coolsms = require("coolsms-node-sdk").default;
const messageService = new coolsms("NCSN0HFQEQCH6CCP", "L8DIVGTW6H2102YO2NFSJL11FTULSBBS");

// 단일 발송 예제
export async function sendID() {
    messageService.sendOne({
        to: "01048745922",
        from: "01048745922",
        text: "시발"
    }).then(res => console.log(res));
}