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

// export function transDate(duration){
//     const time = parseInt(duration);
//     const sec = time % 60 >= 0 ? time%60+"초" : "";
//     const min = parseInt(time % 3600 / 60) > 0 ? parseInt(time % 3600 / 60)+"분 " : "";
//     const hr = parseInt(time / 3600 % 24) > 0 ? parseInt(time / 3600 % 24)+"시간 " : "";
//     const day = parseInt(time / 3600 / 24) > 0 ? parseInt(time / 3600 / 24)+"일 " : "";

//     return `${day}${hr}${min}${sec}`;
// };

export function transDate(date){
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth()+1;
    const day = new Date(date).getDate();
    const hour = new Date(date).getHours();
    const minute = new Date(date).getMinutes();
    const second = new Date(date).getSeconds();

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

// sns 공유

export function shareTwitter(text, url){
    // TO DO : 트위터 공유 텍스트 다국어 삽입
    const sendText = text;

    window.open(`https://twitter.com/intent/tweet?text=${sendText}&hashtags=HBD_to_MK&url=${url}`);

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

export function shareLink(text, url){
    let textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = url;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    alert(text);

    //6. GA이벤트 날리기
    const gaValue = { 
        action :"share",
        category : "group_watching",
        label :"link"
    };
    
    gtag.event(gaValue);
};


// 사용자 접속 지역
export function getUserRegion() {
    return navigator.language.substring(0, 2);
}