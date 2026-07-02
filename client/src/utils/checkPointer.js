export function checkPointer(arr,obj){
   let response = {}; 
   const answer = arr.find((object)=>{
    return object.sem == obj.semester
   })
   if (answer.pointer >= obj.required_sgpa) {
      response.success = true
      response.data = {...answer}; 
   }
   else{
      response.success = false
      response.data = {...answer}
   }
   return response
}

