import { CreateAttributeModel, PagingAttribute } from "@models/Attribute";
import instance from "./Instance";
import { ATTRIBUTES_ENDPOINT } from "@constants/Services";

export const getAttributes = (payload: PagingAttribute) => {
  const { keyword, select_type, page, pageSize } = payload;

  let url = `${ATTRIBUTES_ENDPOINT}?page=${page + 1}&pageSize=${pageSize}`;

  if (select_type) {
    url += `&select_type=${select_type}`;
  }
  if (keyword) {
    url += `&keyword=${keyword}`;
  }

  return instance.get<PagingAttribute>(url);
};

export const getByIdAttribute = (id: string) =>
  instance.get(`${ATTRIBUTES_ENDPOINT}/${id}`);

export const getByLabelAttribute = (label: string) =>
  instance.get(`${ATTRIBUTES_ENDPOINT}/label/${label}`);
