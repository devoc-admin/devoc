import * as migration_20260515_142426_initial_schema from './20260515_142426_initial_schema';
import * as migration_20261108_155105_payload_3_93_upgrade from './20261108_155105_payload_3_93_upgrade';
import * as migration_20261108_160921_blob_object_key from './20261108_160921_blob_object_key';

export const migrations = [
  {
    up: migration_20260515_142426_initial_schema.up,
    down: migration_20260515_142426_initial_schema.down,
    name: '20260515_142426_initial_schema',
  },
  {
    up: migration_20261108_155105_payload_3_93_upgrade.up,
    down: migration_20261108_155105_payload_3_93_upgrade.down,
    name: '20261108_155105_payload_3_93_upgrade',
  },
  {
    up: migration_20261108_160921_blob_object_key.up,
    down: migration_20261108_160921_blob_object_key.down,
    name: '20261108_160921_blob_object_key'
  },
];
