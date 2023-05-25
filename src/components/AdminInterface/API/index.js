export const getAssociation=()=>{

    return (fetch('http://localhost:8282/association').then(res=>res.json()))
}
