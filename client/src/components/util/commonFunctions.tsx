export const getImageUrl = (image:any)=>{
    return image?.fields?.file?.url
}

export const getImageTitle = (image:any)=>{
    return image?.fields?.title
}

export const isEmptyArray = (array:any)=>{
    return array?.length === 0
}

export const noPageFound = ()=>{
    return <>No page found</>;
}