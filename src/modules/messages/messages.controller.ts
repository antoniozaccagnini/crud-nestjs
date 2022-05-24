import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('api/v1/messages')
export class MessagesController {

    constructor(private messageService: MessagesService){

    }

    @Post()
    createMessage(@Body() data: {message: string}){
        return this.messageService.createMessage(data.message);
    }

    @Get()
    getMessages(@Query('start') start: string){
        return this.messageService.getMessages(start);
    }

    @Put("/:message/:newMessage")
    updateMessage(@Param('message') message: string, @Param('newMessage') newMessage: string){
        return this.messageService.updateMessage(message, newMessage);
    }
    
    @Delete("clear")
    clearMessages(){
        return this.messageService.clearMessages();
    }

    @Delete("/:message")
    deleteMessage(@Param('message') message: string){
        return this.messageService.deleteMessage(message);
    }
}
