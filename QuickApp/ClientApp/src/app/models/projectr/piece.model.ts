import { ModelData } from './data.model';
import { ITable } from '../dynamic-crud/ITable.model';
import { PieceContentTag } from './pieceContentTag.model';

export interface IPiece extends ITable {
    name: string;
    description: string;
    projectId: number;
    viewTypeId: number;
    viewTypeAttributeId: number;
    applicationUserId: number;
    createdOn: Date;
    completedOn?: Date;
}

export class Piece implements IPiece {

    description: string;
    projectId: number;
    name: string;
    viewTypeId: number;
    viewTypeAttributeId: number;
    applicationUserId: number;
    createdOn: Date;
    contentTags: PieceContentTag[];
    completedOn?: Date;
    tableDefinition: string = 'Piece';
    static tableName = 'Piece';
    dirty: boolean;
    id: number;

    constructor(props: Piece) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
        // OPTIONAL: If you are using a different primary key than "id" you can transform this here
        // this.id = props.id || props.key || props.MY_PRIMARY_KEY || ''
  }

}