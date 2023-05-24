const token = localStorage.getItem();

if (token) {
    // 헤더변경
}

function logout() {
    localStorage.clear();
    location.reload();
}

function sendit() {
    const userid = document.getElementById('userid');

    // 정규 표현식
    const expIdText = /^[A-Za-z]{4,20}$/;
    const userpw = document.getElementById("userpw");
    const userpw_re = document.getElementById("userpw_re");
    const username = document.getElementById("username");
    const hp = document.getElementById("hp");
    const email = document.getElementById("email");

    // 비밀번호 정규 표현식 과제
    // 영문 숫자 특수기호 조합 8자리 이상
    const expPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;

    // 이름 정규 표현식 과제
    // 2~5 글자 사이의 한글이름
    const expname = /^[가-힣]{2,5}/;

    // 휴대폰번호 정규 표현식 과제
    // 010, 011, 016, 017, 018, 019 로 시작하고 -을 포함하고 숫자의 갯수가 3-4, 4-4여야됨
    const expHp = /^01[0|1|6|7|8|9]\d{7,8}$/;

    // 이메일 정규 표현식 과제
    const expEmail = /^[A-Za-z0-9\-\.]+@[A-Za-z0-9\-\.]+\.[A-Za-z0-9\-\.]+$/;
    
    if (!expIdText.test(userid.value)) {
        alert("아이디는 4자 이상 20자 이하의 영문자로 입력하세요");
        userid.focus();
        return false;
    }
    if(userpw.value != userpw_re.value){
        alert("비밀번호와 비밀번호 확인의 값이 다릅니다.")
        userpw.focus();
        return false;
    }
    if (!expPw.test(userpw.value)) {
        alert("비밀번호는 영문 숫자 특수기호 조합 8~20자리 이내로 입력해주세요");
        userpw.focus();
        return false;
    }
    if (!expname.test(username.value)) {
        alert("이름은 2~5글자 한글로 입력하세요");
        username.focus();
        return false;
    }
    if (!expHp.test(hp.value)) {
        alert("핸드폰 번호를 잘못 입력하셨습니다.");
        hp.focus();
        return false;
    }
    if (!expEmail.test(email.value)) {
        alert("이메일을 잘못 입력하셨습니다.");
        email.focus();
        return false;
    }

    return true;
}