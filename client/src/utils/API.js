import axios from "axios";

export default {
  email: function(type) {
    return axios.post("/api/email", type);
  }
};
