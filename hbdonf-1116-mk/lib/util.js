import * as gtag from "./gtag";


// 시간 관련 메소드

export function transTimecode(duration){
    const sec = duration % 60 <10 ? "0"+duration % 60 : duration % 60;
    const min = parseInt(duration % 3600 / 60) < 10 ? "0"+parseInt(duration % 3600 / 60) : parseInt(duration % 3600 / 60);
    const hr = parseInt(duration / 3600) < 10 ? "0"+parseInt(duration / 3600) : parseInt(duration / 3600);

    return `${hr}:${min}:${sec}`;
};

export function transTimeKo(duration){
    const sec = duration % 60 >= 0 ? duration%60+"초" : "";
    const min = parseInt(duration % 3600 / 60) > 0 ? parseInt(duration % 3600 / 60)+"분 " : "";
    const hr = parseInt(duration / 3600) > 0 ? parseInt(duration / 3600)+"시간 " : "";

    return `${hr}${min}${sec}`;
};

export function transDate(duration){
    const time = parseInt(duration);
    const sec = time % 60 >= 0 ? time%60+"초" : "";
    const min = parseInt(time % 3600 / 60) > 0 ? parseInt(time % 3600 / 60)+"분 " : "";
    const hr = parseInt(time / 3600 % 24) > 0 ? parseInt(time / 3600 % 24)+"시간 " : "";
    const day = parseInt(time / 3600 / 24) > 0 ? parseInt(time / 3600 / 24)+"일 " : "";

    return `${day}${hr}${min}${sec}`;
};

export function transDateKo(date){
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth()+1;
    const day = new Date(date).getDate();
    const hour = new Date(date).getHours();
    const minute = new Date(date).getMinutes();

    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute > 0 ? minute+"분" : ""}`;
};

// sns 공유

export function shareTwitter(gWInfo, url){
    const sendText = `${transDateKo(gWInfo.startDate)} <${gWInfo.title}> 단관 함께 달려요~!!`;

    window.open(`https://twitter.com/intent/tweet?text=${sendText}&hashtags=VMGO_for_ONF&url=${url}`);

    //6. GA이벤트 날리기
    const gaValue = { 
        action :"share",
        category : "group_watching",
        label :"twitter"
    };
    
    gtag.event(gaValue);
}

export function shareFacebook(url){
    window.open("http://www.facebook.com/sharer.php?u=" + url);

    //6. GA이벤트 날리기
    const gaValue = { 
        action :"share",
        category : "group_watching",
        label :"facebook"
    };
    
    gtag.event(gaValue);
}

export function shareLink(url){
    let text = document.createElement("textarea");
    document.body.appendChild(text);
    text.value = url;
    text.select();
    document.execCommand('copy');
    document.body.removeChild(text);

    alert("클립보드에 복사되었습니다.");

    //6. GA이벤트 날리기
    const gaValue = { 
        action :"share",
        category : "group_watching",
        label :"link"
    };
    
    gtag.event(gaValue);
};

export function getGooleCalendar(gWInfo, link){
    // console.log(gWInfo);
    const title = `[VMGO] ${gWInfo.title}`;
    const desc = `온앤오프 라이브 복습 단관 함께 달려요~!! ${link}`;
    const date_start = new Date(gWInfo.startDate);
    const date_end = new Date(gWInfo.endDate);
    const datez_start = date_start.toISOString().replace(/[-:.]/gi,'');
    const datez_end = date_end.toISOString().replace(/[-:.]/gi,'');

    const google_calendar = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${datez_start}/${datez_end}&details=${encodeURIComponent(desc)}&sprop=&sprop=name:`;
    window.open(google_calendar);
    //6. GA이벤트 날리기
    const gaValue = { 
        action :"schedule",
        category : "group_watching",
        label :"google_calendar"
    };
    
    gtag.event(gaValue);
};


// 사용자 접속 지역
export function getUserRegion() {
    return navigator.language.substring(0, 2);
}