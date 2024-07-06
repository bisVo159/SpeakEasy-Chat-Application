import { User } from "../modals/user.js"
import { Chat } from "../modals/chat.js"
import {faker, simpleFaker} from "@faker-js/faker"
import { Message } from "../modals/message.js"

const createUser=async(numbers)=>{
    try {
        const usersPromise=[]

        for(let i=0;i<numbers;i++){
            const tempUser=User.create({
                name:faker.person.fullName(),
                username:faker.internet.userName(),
                bio:faker.lorem.sentence(10),
                password:"1234",
                avatar:{
                    public_id:faker.system.fileName(),
                    url:faker.image.avatar()
                }
            })
            usersPromise.push(tempUser)
        }

        await Promise.all(usersPromise);

        console.log("User created",numbers);
        process.exit(1)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const createSingleChats=async(chatsCount)=>{
    try {
        const users=await User.find().select("_id")
        const chatsPromise=[];

        for(let i=0;i<users.length;i++){
            for(let j=i+1;j<users.length;j++){
                const tempChat=Chat.create({
                    name:faker.lorem.words(2),
                    members:[users[i],users[j]]
                })

                chatsPromise.push(tempChat)
            }
        }

        await Promise.all(chatsPromise);
        console.log("Chats created successfully");
        process.exit(1);
    } catch (error) {
        console.error(error)
        process.exit(1);
    }
}

const createGroupChats=async(numChats)=>{
    try {
        const users=await User.find().select("_id")
        const chatsPromise=[];

        for(let i=0;i<numChats;i++){
            const numMembers=simpleFaker.number.int({min:3,max:users.length})
            const members=[]

            console.log("before")
            for(let j=0;j<numMembers;j++){
                const randomIndex=Math.floor(Math.random()*users.length);
                const randomUser=users[randomIndex];

                if(!members.includes(randomUser)){
                    members.push(randomUser);
                }
                console.log("after")
            }

            const chat=Chat.create({
                groupChat:true,
                name:faker.lorem.words(1),
                members,
                creator:members[0]
            })
            chatsPromise.push(chat);
        }

        await Promise.all((chatsPromise))

        console.log("chats created successfully")
        process.exit();
    } catch (error) {
        console.error(error)
        process.exit(1);
    }
}

const createMessages=async(numMessages)=>{
    try {
        const users=await User.find().select("_id");
        const chats=await Chat.find().select("_id");

        const messagesPromise=[];

        for(let i=0;i<numMessages;i++){
            const randomUser=users[Math.floor(Math.random()*users.length)];
            const randomChat=chats[Math.floor(Math.random()*chats.length)];

            messagesPromise.push(
                Message.create({
                    chat:randomChat,
                    sender:randomUser,
                    content:faker.lorem.sentence()
                })
            )
        }

        await Promise.all(messagesPromise);

        console.log("Messages created  successfully");
        process.exit();
    } catch (error) {
        console.error(error)
        process.exit();
    }
}

const createMessagesInChat=async(chatId,numMessages)=>{
    try {
        const users=await User.find().select("_id");
        const messagesPromise=[];

        for(let i=0;i<numMessages;i++){
            const randomUser=users[Math.floor(Math.random()*users.length)];

            messagesPromise.push(
                Message.create({
                    chat:chatId,
                    sender:randomUser,
                    content:faker.lorem.sentence()
                })
            )
        }
        
        await Promise.all(messagesPromise);

        console.log("Messages created  successfully");
        process.exit();
    } catch (error) {
        console.error(error)
        process.exit();
    }
}

export {
    createUser,
}