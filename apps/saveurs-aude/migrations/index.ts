import * as migration_20260222_143234_add_orders_collection from "./20260222_143234_add_orders_collection";

export const migrations = [
  {
    down: migration_20260222_143234_add_orders_collection.down,
    name: "20260222_143234_add_orders_collection",
    up: migration_20260222_143234_add_orders_collection.up,
  },
];
