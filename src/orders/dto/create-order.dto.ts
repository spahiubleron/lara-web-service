import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The name of the translation job',
    example: 'Website Translation Project'
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  jobName: string;

  @ApiProperty({
    description: 'Language code for the source language',
    example: 'en-US',
    minLength: 2,
    maxLength: 20
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  sourceLangCode: string;

  @ApiProperty({
    description: 'Language code for the target language',
    example: 'it-IT',
    minLength: 2,
    maxLength: 10
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  targetLangCode: string;
}