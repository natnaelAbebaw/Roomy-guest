import axios from "axios";
import { baseUrl } from "../constant";
import { Hotel } from "./hotelApi";

export interface Guest {
  _id: string;
  userName: string;
  email: string;
}

export type JwtToken = string;

export async function login(credentials: {
  email: string;
  password: string;
}): Promise<{ guest: Guest; token: JwtToken; hotel: Hotel }> {
  const url = `${baseUrl}/guests/login`;
  console.log(credentials);
  const response = await axios.post(url, credentials);
  return {
    guest: response.data.user,
    token: response.data.token,
    hotel: response.data.hotel[0],
  };
}

export async function signup(credentials: {
  email: string;
  password: string;
  userName: string;
}): Promise<{ guest: Guest; token: JwtToken }> {
  const url = `${baseUrl}/guests/signup`;
  console.log(credentials);
  const response = await axios.post(url, credentials);
  return {
    guest: response.data.user,
    token: response.data.token,
  };
}
