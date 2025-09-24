import axios from 'axios';

const API_URL = 'https://edu-master-psi.vercel.app';

/*const getLessons = (token, classLevel)=>{
  return axios.get(`${API_URL2}/lesson?classLevel=${encodeURIComponent(classLevel)}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}*/

const getLessons = (token)=>{
  return axios.get(`${API_URL}/lesson`, {
    headers: {
      token:  token
    }
  })
}

export default {
  getLessons,
};