const faqData = [
  {
    index: "전체",
    items: [],
  },
  {
    index: "로그인",
    items: [
      {
        Q: `로그인 시 "등록되지 않은 휴대전화 번호입니다."라는 메시지가 뜨는데 어떻게 해야 하나요?`,
        A: `본 팝업이 뜨는 경우는 다양합니다.<br /><br />
        - 사전점검일 이전에 로그인 시도한 경우, 모든 응시자에 대하여 해당 팝업이 게시됨<br />
        - 사전점검일 기간 중 로그인 시도한 경우, 롯데그룹 채용 홈페이지에 사전에 등록된 응시자 휴대전화 번호와
        <br />다르게 입력하고 인증번호 발송을 클릭한 경우에 게시됨<br />
        - 사전점검일 기간 중 로그인 시도(+올바른 휴대전화 번호 등록)한 경우, 유효 기간(반기) 내 응시 이력을 보유할 
        <br />경우에 게시됨<br /><br />
        상기 사항을 고려하시어 응시자분의 상황에 따라, 대응 부탁드립니다.`,
      },
      {
        Q: `로그인 시 "인증 번호가 일치하지 않습니다. 확인 후 다시 로그인을 시도해주십시오."라는 메시지가 뜨는데 어떻게 해야 하나요?`,
        A: `휴대전화로 전달받으신 인증번호와 다르게 입력하는 경우 발생하는 메시지입니다.<br />
        받으신 인증번호와 일치하게 입력해주시기 바랍니다. 단, 3분 내 인증번호를 정확하게 입력하지 않으면 인증번호 요청을 다시 하셔야 합니다. `,
      },
      {
        Q: `로그인 시 "지금은 로그인하실 수 없습니다. 로그인 가능 시간을 확인해 주십시오."라는 메시지가 
        <br/>뜨는데 어떻게 해야 하나요?`,
        A: `안내 받으신 로그인 가능 시간이 아닌 경우 로그인이 불가합니다.<br />
        사전에 안내된 일정을 확인하시기 바랍니다.<br />
        로그인 시간을 초과하여 접속하신 경우, 본 진단을 응시하실 수 없습니다.
        `,
      },
      {
        Q: `로그인 시 "사전점검을 실시하지 않으면 진단을 응시하실 수 없습니다."라는 메시지가 뜨는데<br />어떻게 해야 하나요?`,
        A: `정해진 기간 내 사전점검을 완료하지 않은 응시자가 본 진단 로그인을 시도하는 경우 발생하는 메시지입니다.<br />
        사전점검 미완료자는 본 진단을 응시하실 수 없습니다.`,
      },
      {
        Q: `로그인 시 "진단 중 부정행위가 감지되었습니다. 따라서 다시 로그인하실 수 없습니다."라는 메시지가 뜨는데 어떻게 해야 하나요?`,
        A: `진단 중 추가 모니터 연결 시도 등의 부정행위에 따라 프로그램이 강제 종료된 이후, 본 진단에 재로그인 시도 시 나타나는 메시지이며, 다시 로그인하실 수 없습니다.`,
      },
      {
        Q: `로그인 시 "응시자님께서는 이미 진단을 완료하셨습니다. 진단 완료 후에는 다시 로그인하실 수 없습니다."라는 메시지가 뜨는데 어떻게 해야 하나요?`,
        A: `본 진단을 종료한 이후 재로그인 시도 시 나타나는 메시지입니다.<br />
        진단 종료 이후에는 다시 로그인하실 수 없습니다.`,
      },
      {
        Q: `로그인 시 "사전점검이 완료 되었습니다. 사전점검은 1회만 하실 수 있습니다"라는 메시지가 뜨는데 어떻게 해야 하나요?`,
        A: `사전점검은1회만 가능합니다. 사전점검을 완료 후 사전점검 기간 내 다시 로그인하실 수 없습니다.<br />
        본 진단 로그인 가능 시간이 되면 본 진단 응시를 위해 로그인하실 수 있습니다.`,
      },
    ],
  },
  {
    index: "주변기기",
    items: [
      {
        Q: `(화면공유) PC 화면이 나오지 않습니다. 어떻게 해야 하나요?`,
        A: `
          아래 순서대로 설정하시기 바랍니다.<br /><br />
          <div class="faq_os">- Windows</div>
          <br />
          <div class="faq_sub_title">1. [ 카메라 앱 "켬" 확인 ]</div>
          ① 윈도우 검색 창 "카메라" 검색 ⇒ ② 카메라 앱 클릭 ⇒  ③ 화면 카메라 잘 작동되는지 확인 후,  좌측 상단 톱니바퀴 클릭 ⇒  ④ 관련 설정에 "개인 정보 설정 변경하기" 클릭 ⇒ ⑤ 다른 앱으로 이동하시겠습니까? "예" 클릭 ⇒ ⑥ 왼쪽 "카메라" 목록 클릭 ⇒ ⑦ 앱에서 카메라 엑세스 허용 "켬" ⇒ ⑧ 카메라에 엑세스할 수 있는 Microsoft Store 앱 선택 하단 카메라 "켬" 확인<br />
          <br />
          <div class="faq_sub_title">2. [ 마이크 앱 "켬" 확인 ]</div>
          ① 왼쪽 "마이크" 목록 클릭 ⇒ ② 앱에서 마이크에 엑세스하도록 허용 "켬" 확인 ⇒ ③ 마이크에 엑세스할 수 있는 Microsoft Store 앱 선택 ⇒ ④ 하단 카메라 "켬" 확인<br />
          <br />
          <div class="faq_sub_title">3. [ 구글 최신버전 확인 ]</div>
          구글 크롬 최신 버전인지 확인<br />
          <br />
          <div class="faq_sub_title">4. 컴퓨터 재부팅 후, 다시 프로그램 접속</div>
          <br />
          <br />
          <div class="faq_os">- Mac</div>
          아래 순서대로 카메라를 설정하시기 바랍니다.<br />
          <br />
          <div class="faq_sub_title">① 시스템 환경 설정 ⇒ ② 보안 및 개인 정보 보호 클릭 ⇒ ③ 카메라 항목 선택 ⇒ ④ Chrome 항목과 OnlineTest_Mac OS 항목 체크</div>
          `,
      },
      {
        Q: `(웸캠) 웹캠이 나오지 않습니다. 어떻게 해야 하나요?`,
        A: `
        아래 순서대로 설정하시기 바랍니다.<br /><br />
        <div class="faq_os">- Windows</div>
          <br />
          <div class="faq_sub_title">1. [ 카메라 앱 "켬" 확인 ]</div>
          ① 윈도우 검색 창 "카메라" 검색 ⇒ ② 카메라 앱 클릭 ⇒  ③ 화면 카메라 잘 작동되는지 확인 후,  좌측 상단 톱니바퀴 클릭 ⇒  ④ 관련 설정에 "개인 정보 설정 변경하기" 클릭 ⇒ ⑤ 다른 앱으로 이동하시겠습니까? "예" 클릭 ⇒ ⑥ 왼쪽 "카메라" 목록 클릭 ⇒ ⑦ 앱에서 카메라 엑세스 허용 "켬" ⇒ ⑧ 카메라에 엑세스할 수 있는 Microsoft Store 앱 선택 하단 카메라 "켬" 확인<br />
          <br />
          <div class="faq_sub_title">2. [ 마이크 앱 "켬" 확인 ]</div>
          ① 왼쪽 "마이크" 목록 클릭 ⇒ ② 앱에서 마이크에 엑세스하도록 허용 "켬" 확인 ⇒ ③ 마이크에 엑세스할 수 있는 Microsoft Store 앱 선택 ⇒ ④ 하단 카메라 "켬" 확인<br />
          <br />
          <div class="faq_sub_title">3. [ 구글 최신버전 확인 ]</div>
          구글 크롬 최신 버전인지 확인<br />
          <br />
          <div class="faq_sub_title">4. 컴퓨터 재부팅 후, 다시 프로그램 접속</div>
          <br />
          <br />
          <div class="faq_os">- Mac</div>
          <br />
          <div class="faq_sub_title">① 시스템 환경 설정 ⇒ ② 보안 및 개인 정보 보호 클릭 ⇒ ③ 카메라 항목 선택 ⇒ ④ Chrome 항목과 OnlineTest_Mac OS 항목 체크</div>`,
      },
      {
        Q: `(웹캠) 휴대전화 화상통화를 활용하여 웸캡을 진행해도 되나요?`,
        A: `웹캠의 경우 노트북에 내장되어 있는 카메라나 별도로 설치된 웹캠만 사용 가능합니다.<br />
          휴대전화 사용은 불가합니다.`,
      },
      {
        Q: `(마이크) 마이크가 나오지 않습니다.  어떻게 해야 할까요?`,
        A: `
          아래 순서대로 설정하시기 바랍니다.<br /><br />
          <div class="faq_os">- Windows</div>
          <br />
          <div class="faq_sub_title">① 제어판 ⇒ ② 소리 ⇒  ③ 녹음 탭 클릭 ⇒  ④ 마이크에 오른쪽 마우스 ⇒ ⑤ 사용 ⇒ ⑥ 속성 ⇒ ⑦ 수준 탭 <br />
          ⇒ ⑧ 음소거 해제</div>
          <br />
          <br />
          <div class="faq_os">- Mac</div>
          <br />
          <div class="faq_sub_title">① 시스템 환경 설정 ⇒ ② 보안 및 개인 정보 보호 클릭 ⇒ ③ 마이크 항목 선택 ⇒ ④ Chrome 항목과 OnlineTest_Mac OS 항목 체크</div>
          `,
      },
      {
        Q: `(스피커) 소리가 들리지 않습니다. 어떻게 해야 할까요?`,
        A: `
          아래 순서대로 설정하시기 바랍니다.<br /><br />
          <div class="faq_sub_title">① 제어판 ⇒ ② 소리 ⇒  ③ 재생 ⇒  ④ 스피커에 오른쪽 마우스 ⇒ ⑤ 사용 ⇒ ⑥ 속성 ⇒ ⑦ 수준 탭 <br />
          ⇒ ⑧ 음소거 해제</div>
          `,
      },
      {
        Q: `(스피커) 헤드셋이나 이어폰을 사용해도 되나요?`,
        A: `귀에 꽂는 디바이스는 사용이 불가 합니다.<br />노트북은 내장된 스피커를 활용하시고 데스크탑은 별도의 스피커를 준비하시기 바랍니다.<br />스피커는 감독위원과의 소통 용도로만 사용되오니, 전원은 On 유지해주시기 바랍니다.`,
      },
      {
        Q: `(모니터) 추가 모니터(듀얼 모니터)를 연결하여 진행해도 되나요?`,
        A: `추가 모니터 연결은 불가합니다.<br />
        추가 모니터가 연결된 상태에서 로그인을 시도할 경우, 프로그램이 강제 종료되니 이점 유의하시기 바랍니다.<br /> (단, 부정행위로 간주되지 않음)<br />
        하지만, 로그인 이후에 추가 모니터를 연결하면 부정행위로 간주되고 프로그램이 강제 종료됩니다.<br />
        ※ 스크린패드를 장착한 노트북의 경우, 듀얼 모니터로 인식됨 (스크린패드 Off)
        `,
      },
    ],
  },
  {
    index: "기타",
    items: [
      {
        Q: `진단 중 종이 및 필기구를 사용할 수 있나요?`,
        A: `진단 중 종이 및 필기구를 사용할 수 없으며, 프로그램 내 제공되는 메모장 기능만을 사용할 수 있습니다.<br />
        계산기는 소지할 수 없으며, 프로그램 내 제공되는 계산기 기능만을 사용할 수 있습니다.`,
      },
      {
        Q: `사전점검과 본 진단 때 환경이 달라도 상관없나요?(PC나 응시장소 변경)`,
        A: `사전점검과 본 진단의 환경이 달라도 불이익은 없습니다. 다만 사전점검 시 본 진단 당일 발생가능한 환경적<br />
        요인(PC/네트워크 상태, 소음 및 타인출입방지 등)을 반드시 확인하셔야 합니다.<br />
        이를 위해 본 진단과 동일한 응시환경에서 사전점검을 실시하시기를 강하게 권고 드립니다.`,
      },
      {
        Q: `사전점검 중 오류가 발생하여 프로그램을 종료하려면 어떻게 해야 하나요?`,
        A: `오른쪽 상단 "X" 버튼을 클릭하여 프로그램을 종료한 후 프로그램에 다시 로그인해주시기 바랍니다.`,
      },
      {
        Q: `사전점검을 다시 하고 싶은데 어떻게 해야 하나요?`,
        A: `사전점검은 1회만 가능합니다. 사전점검 완료 이후에는 다시 사전점검을 하실 수 없습니다.`,
      },
      {
        Q: `문의사항이 있는 경우 어떻게 해야 하나요? `,
        A: `진단 시스템 및 실시 관련 문의사항은 로그인 화면 우측 상단 「문제가 있나요?」 클릭하셔서 FAQ 확인 또는 <br />
        1:1 문의 작성하기를 진행해주시기 바랍니다.<br />
        1:1 문의 작성하기는 클릭 후 문의사항을 작성하셔서 제출하시면 입력하신 휴대전화 번호로 답변을 문자 발송해 드립니다.<br />
        그외, 비상연락처(02-549-5222)로 연락주시기 바랍니다.<br /><br />
        진단 시스템 이외, 채용 전형 관련 문의는 롯데그룹 채용 홈페이지<br />(https://recruit.lotte.co.kr)의 “지원안내 > 문의사항”을 통해 남겨주시거나, 지원하신 회사의 채용담당자에게 <br />
        연락 주시길 부탁 드립니다.
        `,
      },
    ],
  },
];

export default faqData;
