import axios from "axios"

const url = 'http://127.0.0.1:8000/api/dashboard/'
// const url = 'https://warsha.htc-company.com/public/api/dashboard/'
const target="http://localhost:5173/"
// const target="https://warsha.htc-company.com/"
const imageUrl = "http://127.0.0.1:8000/getImage/"
// const imageUrl = "https://warsha.htc-company.com/public/getImage/"
const UseAxios = async (props) => {
  const response = await axios({
    method: props.method,
    url: url+props.api,
    data: props.data || null,
    headers: {
      'Accept': 'application/json',
      "Content-Type": "multipart/form-data"
    }
  });
  return response;
};

const getMe = async () => {
 try {
  const response = await axios.post(url + "me", null, {
   headers: {
    'Accept': 'application/json',
      'Content-Type': 'application/json',
    
    'Authorization': `Bearer ${localStorage.getItem("token")}`
   }
  });

  sessionStorage.setItem("is_admin", response.data.is_admin === 1 ? "true" : "false");
  sessionStorage.setItem("points", response.data.points);

 } catch (error) {

console.log(error);
 }
};
export { url, imageUrl,target, getMe, UseAxios }