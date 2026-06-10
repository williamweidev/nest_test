import { DataSource } from 'typeorm';

const typeorm_config =  require('./typeOrmConfig').default ?? require('./typeOrmConfig');

// TypeORM CLI expects a DataSource instance for `-d src/config/data-source.ts`.
export default new DataSource(typeorm_config);
