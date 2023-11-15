import { AddressModel } from '../model';

export class AddressGetAllDataRO implements AddressModel {
  id: string;
  location: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export class AddressGetAllRO {
  data: AddressGetAllDataRO[];
}

export class AddressCreateRO implements AddressModel {
  id: string;
  location: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export class AddressUpdateRO implements AddressModel {
  id: string;
  location: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
