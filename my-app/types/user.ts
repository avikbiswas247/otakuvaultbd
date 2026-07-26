export interface FrontendRegisterUserInput {

  username: string;
  email: string;
  password: string;

}


export interface RegisterUserInput {
  username: string;
  email: string;
  password_hash: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface RegisteredUser {
  
  username: string;
  email: string;
  password_hash: string;
  
}
export interface LoginUser {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: Date;
}