import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
    //   {
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'crafty_ways_db',
    //   synchronize: true,
    //   logging: false,
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   migrations: ['src/migrations/**/*.ts'],
    // }

    // RDS Config
    //   {
    //   type: 'mysql',
    //   host: 'craftywaysdb.cbmemndkpzaq.eu-west-1.rds.amazonaws.com',
    //   port: 3306,
    //   username: 'root',
    //   password: 'craftywaysdb',
    //   database: 'craftywaysdb',
    //   synchronize: true,
    //   logging: false,
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   migrations: ['src/migrations/**/*.ts'],
    // }

      {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'crafty_ways_db',
      synchronize: true,
      logging: false,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['src/migrations/**/*.ts'],
    }
    ),
    UsersModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
