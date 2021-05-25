import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionsLoggerFilter extends BaseExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    console.log(exception);
    super.catch(exception, host);
  }
}
