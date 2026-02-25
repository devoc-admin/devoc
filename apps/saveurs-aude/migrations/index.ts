import * as migration_20260222_143234_add_orders_collection from './20260222_143234_add_orders_collection';
import * as migration_20260225_215046 from './20260225_215046';

export const migrations = [
  {
    up: migration_20260222_143234_add_orders_collection.up,
    down: migration_20260222_143234_add_orders_collection.down,
    name: '20260222_143234_add_orders_collection',
  },
  {
    up: migration_20260225_215046.up,
    down: migration_20260225_215046.down,
    name: '20260225_215046'
  },
];
