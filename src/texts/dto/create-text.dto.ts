import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, MinLength, MaxLength } from 'class-validator';

export class CreateTextDto {
    @ApiProperty({
        description: 'The UUID of the order this text belongs to',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID()
    @IsNotEmpty()
    orderId: string;

    @ApiProperty({
        description: 'The text content to be translated',
        example: 'Hello world! This is a sample text that needs to be translated.',
        minLength: 1,
        maxLength: 500
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(500)
    text: string;
}