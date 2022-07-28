import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    console.log(value);
    if( !isValidObjectId(value) ){
      throw new BadRequestException(`${ value } is not a valid MongoDBId`);
    }

    return value;
  }
}
