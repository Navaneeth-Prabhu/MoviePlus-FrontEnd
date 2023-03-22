import axios from "axios";


const UserInstance = axios.create({
	// Configuration
	baseURL: `${process.env.REACT_APP_STAGE == "dev" ? "http://localhost:3001" : "https://movieplus.online"}`,
	withCredentials:true,
	// headers: {
  //   'Authorization': `Bearer ${localStorage.getItem('theaterjwt')}`
	// },
});
const TheaterInstance = axios.create({
	// Configuration
	baseURL: `${process.env.REACT_APP_STAGE == "dev" ? "http://localhost:3001/theater" : "https://movieplus.online/theater"}`,
	withCredentials:true,
	headers: {
    'Authorization': `Bearer ${localStorage.getItem('theater')}`
	},
});


const AdminInstance = axios.create({
	// Configuration
	baseURL: `${process.env.REACT_APP_STAGE == "dev" ? "http://localhost:3001/admin" : "https://movieplus.online/admin"}`,
	withCredentials:true,
	headers: {
    'Authorization': `Bearer ${localStorage.getItem('admin')}`
	},
});

// const UserInstance = axios.create({
// 	// Configuration
// 	baseURL: 'http://localhost:3000',
// 	withCredentials:true,
// 	// headers: {
//   //   'Authorization': `Bearer ${localStorage.getItem('theaterjwt')}`
// 	// },
// });
// const TheaterInstance = axios.create({
// 	// Configuration
// 	baseURL: 'http://localhost:3000/theater',
// 	withCredentials:true,
// 	headers: {
//     'Authorization': `Bearer ${localStorage.getItem('theaterjwt')}`
// 	},
// });


// const AdminInstance = axios.create({
// 	// Configuration
// 	baseURL: 'http://localhost:3000/admin',
// 	withCredentials:true,
// 	headers: {
//     'Authorization': `Bearer ${localStorage.getItem('adminjwt')}`
// 	},
// });
// const UserInstance = axios.create({
//   baseURL: "https://movieplus.online",
//   withCredentials:true,
//   headers: { 'Authorization': `Bearer ${localStorage.getItem('theaterjwt') ? localStorage.getItem('theaterjwt') : localStorage.getItem('theaterjwt')}` } 
// });

export  {UserInstance,TheaterInstance,AdminInstance};