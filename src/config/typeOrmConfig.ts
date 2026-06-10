import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  entities: [__dirname + '/../api/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: true,
  url: process.env.DB_URL || '',
  ssl: { rejectUnauthorized: false },
  logging: 'all',
  migrationsRun: false,
  migrationsTransactionMode: 'each',
};

export default typeOrmConfig;
