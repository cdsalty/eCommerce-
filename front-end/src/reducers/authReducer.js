// a reducer is a FUNCTION that returns an object,
//  or a piece of state to the rootReducer

// ========I, specifically manage, the user's name and token========
// if you want to change me let me know by action.type

export default (state = [], action)=>{
    // signature takes state, we default it to []
    if (action.type === 'AUTH_ACTION'){
        // I am going to update because I care
        console.log(action.payload.data)
        return action.payload.data;
    }else if(action.type === "LOGIN_ACTION"){
        // let data = {...action.payload.data}
        
        console.log(action.payload.data)
        return action.payload.data
    }else if(action.type=== "LOGOUT"){
        return [];
    }else{
        return state;
    }
}