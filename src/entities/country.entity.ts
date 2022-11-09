import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;
  @Column({ name: 'country_name' })
  countryName: string;
  @Column({ name: 'country_code' })
  countryCode: number;
  @Column({
    type: 'st_geometry',
    spatialFeatureType: 'Polygon',
    srid: 4326,
  })
  location: Array<Array<number>>;
}
