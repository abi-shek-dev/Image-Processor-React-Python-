import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const convertImage = async (file, format, compress) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('format', format);
  formData.append('compress', compress); // Send the toggle state

  return axios.post(`${API_URL}/convert`, formData, {
    responseType: 'blob', 
  });
};