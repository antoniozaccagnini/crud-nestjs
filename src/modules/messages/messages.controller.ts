import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MessagesService } from './messages.service';

@Controller('api/v1/messages')
@ApiTags('Messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Post()
  @ApiOperation({
    description: 'Crea un mensaje y devuelve true si no hay ningun error.',
  })
  @ApiBody({
    description: 'Añade un mensaje',
    examples: {
      example1: {
        value: {
          message: 'Creando una API REST',
        },
      },
      example2: {
        value: {
          message: 'CRUD con NESTJS',
        },
      },
      example3: {
        value: {
          message: 'Probando Swagger',
        }
      }
    },
  })
  createMessage(@Body() data: { message: string }) {
    return this.messageService.createMessage(data.message);
  }

  @Get()
  @ApiOperation({
    description: 'Retorna un mensaje especificado en la peticion o todos los mensajes si no se especifica nada.',
  })
  @ApiQuery({
    name: 'start',
    type: 'string',
    required: false,
    description: 'Devuelve un mensaje en especifico',
  })
  getMessages(@Query('start') start: string) {
    return this.messageService.getMessages(start);
  }

  @Put('/:message/:newMessage')
  @ApiParam({
    name: 'message',
    type: 'string',
    description: 'Mensaje antiguo a actualizar',
  })
  @ApiParam({
    name: 'newMessage',
    type: 'string',
    description: 'Mensaje nuevo a actualizar',
  })
  @ApiOperation({
    description: 'Actualiza un mensaje del parametro y retorna true.',
  })
  updateMessage(
    @Param('message') message: string,
    @Param('newMessage') newMessage: string,
  ) {
    return this.messageService.updateMessage(message, newMessage);
  }

  @Delete('clear')
  @ApiOperation({
    description: 'Elimina todos los mensajes.',
  })
  clearMessages() {
    return this.messageService.clearMessages();
  }

  @Delete('/:message')
  @ApiParam({
    name: 'message',
    type: 'string',
    description: 'Mensaje a eliminar',
  })
  @ApiOperation({
    description: 'Elimina un mensaje especificado en el parametro y retorna true si se realiza correctamente.',
  })
  deleteMessage(@Param('message') message: string) {
    return this.messageService.deleteMessage(message);
  }
}
