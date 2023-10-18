import {headers} from '../constansts/constanst'
const urlBase=process.env.REACT_APP_URL_BASE;


export const getFilePdfUsersRequest=async (body)=>{
    const request=await fetch(urlBase+"/get-file-pdf",{
        method:"POST",
        headers,
        body:JSON.stringify({data:body})
    });
    return await request.blob();
}

export const getFileExcelUsersRequest=async (body)=>{
    const request=await fetch(urlBase+"/get-file-excel",{
        method:"POST",
        headers,
        body:JSON.stringify({data:body})
    });
    return await request.blob();
}

export const updateUserRequest=async (id,body)=>{
    const request=await fetch(urlBase+"/update/"+id,{
        method:"PUT",
        headers,
        body:JSON.stringify(body)
    });
    return await request.json();
}

export const filterUsersRequest=async (options)=>{
    const request=await fetch(urlBase+"/filter",{
        method:"POST",
        headers,
        body:JSON.stringify({...options})
    });
    return await request.json();
}

export const deleteAllUserRequest=async ()=>{
    const request=await fetch(urlBase+"/delete-all-users",{
        method:"DELETE",
        headers,
    });
    return await request.json();
}

export const deleteUserRequest=async (id)=>{
    const request=await fetch(urlBase+"/"+id,{
        method:"DELETE",
        headers,
    });
    return await request.json();
}

export const getAllUsersRequest=async ()=>{
    const request=await fetch(urlBase,{
        method:"GET",
        headers,
    });
    return await request.json();
}

export const createUserRequest=async (body)=>{
    const request=await fetch(urlBase+"/create",{
        method:"POST",
        headers,
        body:JSON.stringify(body)
    });
    return await request.json();
}
