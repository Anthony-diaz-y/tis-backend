import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { QrsService } from './qrs.service';
import { CreateQrDto } from './dto/create-qr.dto';

@Controller('qrs')
export class QrsController {
  constructor(private readonly qrsService: QrsService) {}

  @Post('createQr')
  createQr(@Body() createQrDto: CreateQrDto) {
    return this.qrsService.createQr(createQrDto);
  }

  // @Get(':id')
  // findOneQr(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.qrsService.findOneQr(id);
  // }

  // @Get()
  // findAll() {
  //   return this.qrsService.findAll();
  // }

  
}
