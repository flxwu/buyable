import { IGroupReference, IUserReference } from './reference';

export interface IItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageURLs: Array<string>;
    amount: number;
    groups?: Array<IGroupReference>;
    owner: IUserReference;
}
