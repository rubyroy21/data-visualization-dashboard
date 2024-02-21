import { get } from "./api-services";

export const getAllData = () => {
  return get("http://20.121.141.248:5000/assignment/feb/sde_fe");
};
