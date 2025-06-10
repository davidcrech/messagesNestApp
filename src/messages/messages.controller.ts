import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  messagesSerivce: MessagesService;

  constructor() {
    // TODO: use dependency injection instead
    this.messagesSerivce = new MessagesService();
  }

  @Get()
  listMessages() {
    return this.messagesSerivce.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesSerivce.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesSerivce.findOne(id);

    if (!message) {
      throw new NotFoundException('message not found');
    }

    return message;
  }
}
