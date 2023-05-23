import nodemailer from "nodemailer";
// const { readFileSync, unlinkSync, stat, readdirSync } = require('fs'); // 파일을 다룰 경우

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: "udirohelper@gmail.com", // 'myemail@gmail.com'
		pass: "vjjxzxncxwjqkexl!", // 'password486!'
	}
});

const mailOptions = {
    from:"udirohelper@gmail.com",
    to : "udirohelper@gmail.com",
    subject: "mailTest",
    text:"Test"
}

// const result = await transporter.sendMail({
//     from: "udirohelper@gmail.com",
//     to: "de_crystal@naver.com",
//     subject: "성대형 바보",
//     html: "성대형바보 ㅋ"
// })
// console.log(result);

transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log(error);
    }else{
        console.log(info);
    }
})