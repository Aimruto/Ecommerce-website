import {create} from "zustand";//pacakge for global state management
import axios from "../lib/axios";
import {toast} from "react-hot-toast";

export const useUserStore=create((set,get)=>({
    user:null,
    loading:false,
    checkingAuth: true,
    signup: async({name,email,password,confirmPassword})=>{
        set({loading:true});
        if(password !==confirmPassword){
            set({loading: false});
            return toast.error("Password do not match");
        }
        try{
            const res=await axios.post("/auth/signup",{name,email,password});
            set({ user: res.data.user,loading:false});
        }
        catch(error){
            set({loading:false});
            toast.error(error.response.data.message ||  "An error occured");
        }
    },
    login: async(email,password)=>{
        set({loading:true});
        try{
            const res=await axios.post("/auth/login",{email,password});
            set({ user: res.data,loading:false});
        }
        catch(error){
            set({loading:false});
            toast.error(error.response.data.message ||  "An error occured");
        }
    },
    checkAuth: async()=>{
        set({checkingAuth:true});
        try{
            const response=await axios.get("/auth/profile");
            set({user: response.data, checkingAuth:false});
        }
        catch(error){
            console.log(error.message);
            set({ checkingAuth:false,user:null});
        }
    },
    logout:async()=>{
        try{
            await axios.post("/auth/logout");
            set({user:null});
        }
        catch(error){
            toast.error(error.response?.data?.message || "An error occured during logout");
        }
    },

}));

// Implement the axios interceptors for refreshing  access token: will expire in 15m