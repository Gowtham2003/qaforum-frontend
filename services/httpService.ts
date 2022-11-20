// showLastCommitMessageForThisLibrary.js
import { create } from "apisauce";

// define the api
const api = create({
  baseURL: process.env.NEXT_PUBLIC_API_URL+"/api/",
});

export default api;
