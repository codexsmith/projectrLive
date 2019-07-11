import { AgileHouseUserModel, ProjectSummary } from "./agileHouseUser.model";

export interface ISliderContentModel{
  getContent(): UISliderContentModel;
}

export interface UISliderContentModel{
  thumbnail: string;
  title: string;
  subtext: string;
  link: string;
}

export interface IProject extends ISliderContentModel{
  Id: string | null;
  Name: string | null;
  AuthorId: string | null;
  ProjectView: ViewType;
  CreatedOn: string | null;
  CompletedOn: string | null;
  Pieces: string[] | null;
}

export enum ViewType {Pinboard, Kanban, Archive}
export enum ViewPanel {Backlog, Kanban}

export class ProjectModel implements IProject{
  
  getContent() : UISliderContentModel {
    const model: UISliderContentModel = {
      thumbnail: '',
      title: this.Name,
      subtext: this.Pieces.length.toString(),
      link: ''
    };
    return model;
  };

  Id: string | null;
  Name: string | null;
  AuthorId: string | null;
  ProjectView: ViewType;
  CreatedOn: string | null;
  CompletedOn: string | null;
  Pieces: string[] | null;
}

export interface UserProjectsSummaryResponse{
  User: AgileHouseUserModel | null;
  View: ViewType | null;
  Results: ProjectSummary[];
}