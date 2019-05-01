import axios from "axios";
import { apiServer } from "config";

const instance = axios.create({
  baseURL: apiServer,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Cache: "no-cache"
  },
  withCredentials: true
});

//초기 데이터
export const getInitialData = () => instance.get(`/api/auth/initialData`);
export const check_login = () => instance.get(`/api/auth/check`);
export const logout = () => instance.get(`/api/auth/logout`);

//카테고리 관련
export const getCategories = ({ page = 1 }) =>
  instance.get(`/api/category?page=${page}`);
export const getCategory = id => instance.get(`/api/category/${id}`);
export const writeCategory = ({ category }) =>
  instance.post(`/api/category`, { category });
export const updateCategory = ({ _id, category }) =>
  instance.patch(`/api/category/${_id}`, { category });
export const deleteCategory = ({ _id }) =>
  instance.delete(`/api/category/${_id}`);
export const selectCategory = ({ categoryId }) =>
  instance.patch(`/api/category/select/${categoryId}`);

//할일
export const getToDos = ({ page = 1, categoryId, completed }) => {
  if (!categoryId) {
    return false;
  }
  let url = `/api/toDos/${categoryId}?page=${page}`;
  if (completed === true) {
    url += "&completed=true";
  }
  return instance.get(url);
};
export const writeToDo = ({ categoryId, content }) =>
  instance.post(`/api/toDos/`, { categoryId, content });
export const getToDo = id => instance.get(`/api/toDos/toDo/${id}`);
export const updateToDo = ({ itemId, content, completed }) => {
  return instance.patch(`/api/toDos/${itemId}`, {
    content: content,
    completed: completed
  });
};
export const deleteToDo = ({ _id }) => instance.delete(`/api/toDos/${_id}`);

// ===== 설정
// config 가져오기.
export const getConfig = sw => instance.get("/api/config");
// 토글 완료 목록 함께 보기
export const toggleCompleteView = sw => {
  const url =
    "/api/config/toggleCompleteView?sw=" + (sw === true ? "true" : "false");
  return instance.patch(url);
};
