import { IItemReference, IGroupReference } from './reference';

export interface IUser {
    _id: string;
    username: string;
    password: string;
    email: string;
    forename?: string;
    surname?: string;
    items?: Array<IItemReference>;
    groups?: Array<IGroupReference>;
    ownedGroups?: Array<IGroupReference>;

}
