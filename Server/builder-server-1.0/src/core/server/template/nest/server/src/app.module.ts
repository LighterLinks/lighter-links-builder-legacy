import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<module_imports>

@Module({
  imports: [<modules>],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
