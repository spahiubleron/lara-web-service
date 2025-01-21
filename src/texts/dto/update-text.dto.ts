import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class UpdateTextDto {
    @ApiProperty({
        description: 'The updated text content',
        example: 'Updated text content that needs to be translated.',
        minLength: 1,
        maxLength: 500
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(500)
    text: string;
}
