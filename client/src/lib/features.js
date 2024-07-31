import moment from "moment"

const fileFormat=(url="")=>{
    const fileExt=url.split('.').pop()

    if(fileExt==='mp4'||fileExt==='webm'||fileExt==='ogg') return "video"

    else if(fileExt==='mp3'||fileExt==='wev') return "audio"

    else if(fileExt==='png'||fileExt==='jpg'||fileExt==='jpeg'||fileExt==='gif') return "image"

    else return "file"
}

// /dpr_auto/w_200
const transformImage=(url="",width=100)=>{
    // https://res.cloudinary.com/dnlldlioj/image/upload/dpr_auto/w_200/v1721453011/
    // 566fe62c-e124-4ee3-9005-20db711f66f4.jpg

    const newUrl=url.replace("upload/",`upload/dpr_auto/w_${width}/`);

    return newUrl
}

const getLast7Days=()=>{
    const currentDate=moment(Date.now())
    const last7Days=[];

    for(let i=0;i<7;i++){
        const dayDate=currentDate.clone().subtract(i,"days")
        last7Days.push(dayDate.format("dddd"))
    }
    return last7Days.reverse()
}

const getOrSaveFromStorage=({key,value,get})=>{
    if(get) return localStorage.getItem(key)
        ?JSON.parse(localStorage.getItem(key))
        :null;

    else localStorage.setItem(key,JSON.stringify(value));
}

export {fileFormat,transformImage,getLast7Days,getOrSaveFromStorage}