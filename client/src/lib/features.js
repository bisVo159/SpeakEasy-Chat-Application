import moment from "moment"

const fileFormat=(url="")=>{
    const fileExt=url.split('.').pop()

    if(fileExt==='mp4'||fileExt==='webm'||fileExt==='ogg') return "video"

    else if(fileExt==='mp3'||fileExt==='wev') return "audio"

    else if(fileExt==='png'||fileExt==='jpg'||fileExt==='jpeg'||fileExt==='gif') return "image"

    else return "file"
}

const transformImage=(url="",width=100)=>url

const getLast7Days=()=>{
    const currentDate=moment()
    const last7Days=[];

    for(let i=0;i<7;i++){
        const dayDate=currentDate.clone().subtract(i,"days")
        last7Days.push(dayDate.format("dddd"))
    }
    return last7Days
}

export {fileFormat,transformImage,getLast7Days}