import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {

    private _messages: string[];

    constructor(){
        this._messages = [];
    }

    createMessage(message: string){

        const repeatedMessage = this._messages.find(n => n.toLowerCase().trim() == message.toLowerCase().trim())

        if(!repeatedMessage){
            this._messages.push(message);
            return true
        }else{
            return false;
        }
    }
    
    getMessages(start?: string){
        if(!start){
        return this._messages;
        }else{
        return this._messages.filter(n => n.toLowerCase().trim().startsWith(start.toLowerCase().trim()));
        }
    }

    updateMessage(message: string, newMessage: string){

        const indexMessage = this._messages.findIndex(n => n.toLowerCase().trim() == message.toLowerCase().trim());
        const indexNewMessage = this._messages.findIndex(n => n.toLowerCase().trim() == newMessage.toLowerCase().trim());

        if(indexMessage != -1 && indexNewMessage == -1){
            this._messages[indexMessage] = newMessage;
            return true;
        }else{
            return false;
        }

    }

    deleteMessage(message: string){

        console.log(this._messages)
        const messagesPrev = this._messages.length;
        this._messages = this._messages.filter(n => n.toLowerCase().trim() != message.toLowerCase().trim());
        console.log(this._messages)
        const messagesNext = this._messages.length;
        return messagesPrev != messagesNext;
    }

    clearMessages(){
        this._messages = [];
        return true;
    }
}
