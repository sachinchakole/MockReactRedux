export const authHeader= (token:any) => {
    // return authorization header with jwt token
   
    let user = JSON.parse(localStorage.getItem('user') as any);
    
    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}