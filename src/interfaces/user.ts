import { IItemReference } from './reference';

export interface IUser {
	_id: string,
	name?: string,
	items?: Array<IItemReference>
}
