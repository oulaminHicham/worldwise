import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };
  

const  AuthContext = createContext();

const inialState = {
    user:null,
    isAthenticated:false,
    errors:''
}

function reducer(state , action){
    switch(action.type){
        case 'login':
            return {...state , user:action.payload , isAthenticated:true}
        case 'logout':
            return {...state , user:null , isAthenticated:false}
        case 'errors':
            return {...state , errors:action.payload}
        default:
            throw new Error('Unknown Action !') ;
    }
}

function AuthProvider({children}){
    const [{user , isAthenticated , errors} , dispatch] = useReducer(reducer ,inialState)

    function login(email , password){
        if(email === FAKE_USER.email && password === FAKE_USER.password){
            dispatch({type:'login' , payload:FAKE_USER});
        }else{
            dispatch({type:'errors' , payload:'The Email Or PassWord Is Incorrect !'})
        }
        
    }

    function logout(){dispatch({type:'logout'})}

    return <AuthContext.Provider value={{user , isAthenticated , login , logout,errors}}>
        {children}
    </AuthContext.Provider>
}

function useAuth(){
    const context = useContext(AuthContext);
    if(!context) throw new Error('the authContext was used ouside the authProvider !')
    return context ;
}

export {AuthProvider , useAuth}
