import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateQrDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    userId: string;
}
