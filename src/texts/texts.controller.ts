import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TextsService } from './texts.service';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { Text } from './entities/text.entity';

@ApiTags('texts')
@Controller('texts')
export class TextsController {
  constructor(private readonly textsService: TextsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new text to an order' })
  @ApiResponse({ 
    status: 201, 
    description: 'The text has been successfully added to the order.',
    type: Text 
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  addTextToOrder(@Body() createTextDto: CreateTextDto) {
    return this.textsService.addTextToOrder(createTextDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing text' })
  @ApiParam({ name: 'id', description: 'Text ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'The text has been successfully updated.',
    type: Text 
  })
  @ApiResponse({ status: 400, description: 'Cannot edit text from an already submitted order.' })
  @ApiResponse({ status: 404, description: 'Text not found.' })
  updateText(
    @Param('id') id: string,
    @Body() updateTextDto: UpdateTextDto
  ) {
    return this.textsService.updateText(id, updateTextDto);
  }
}
