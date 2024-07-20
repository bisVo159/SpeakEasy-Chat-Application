

const corsOptions={
    origin:[
        "http://localhost:5173",
        "http://localhost:4173",
        process.env.CLIENT_URL
    ],
    methods:["PUT","POST","GET","DELETE"],
    credentials:true
}

const SPEAKEASY_TOKEN="speakEasy-token"
export {corsOptions,SPEAKEASY_TOKEN}