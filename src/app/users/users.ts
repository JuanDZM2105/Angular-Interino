export interface UserDTO{
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserCreationDTO{
  name: string;
  email: string;
  password: string;
  phone: string;
}
