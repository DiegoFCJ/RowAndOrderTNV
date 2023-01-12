export interface User {
  name: string;
  surname: string;
  username: string;
  score?: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  surname: string;
  username: string;
  password: string;
}

export interface DatoToComment {
  comment: string;
  rating: number;
  user_id: number;
  movie_id: number
}

export interface ScoreInfo {
  userId: number;
  userName: string;
  score: number
}

export interface UserLocalSt {
  id: number;
  name: string;
  surname: string;
  email: string;
  username: string;
  score: number;
}
