import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class SendEmailDTO {
    @IsNotEmpty()
    @ApiProperty({ type: String })
    name: string;
  
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ type: String })
    email: string;
  
  
    @IsOptional()
    @ApiProperty({ type: String })
    mobile: string;
  
  
    @IsOptional()
    @ApiProperty({ type: String })
    company: string;
  
    @IsNotEmpty()
    @ApiProperty({ type: String })
    subject: string;
  
    @IsNotEmpty()
    @ApiProperty({ type: String })
    message: string;
}