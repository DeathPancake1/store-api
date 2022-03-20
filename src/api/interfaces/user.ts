export interface User {
    id?: number;
    firstname: string;
    lastname: string;
    password: string;
  }
export interface UserAuth {
    auth : boolean;
    token : string;
}