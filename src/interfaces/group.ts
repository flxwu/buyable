import { IUserReference, IItemReference} from './reference';

export interface IGroup {
	_id: string,
  items: Array<IItemReference>,
  users: Array<IUserReference>,
	admin: IUserReference,
	settings: IGroupSettings
}

export interface IGroupSettings {
	public: boolean,
	priceLimit: number
}