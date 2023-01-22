import validate from "validate.js";


export const ValidateString = (id,value)=>{
    const Constraints = {
        presence: { allowEmpty: false },
      };
      if (value !== "") {
        Constraints.format = {
          pattern: "[a-z]+",
          flags: "i",
          message: "can only contain letters",
        };
      }

      const ValdationResult = validate({ [id]: value }, { [id]: Constraints })

      return (ValdationResult&& ValdationResult[id])
  
      
}

export const ValidateEmail = (id,value)=>{
    const Constraints = {
        presence: { allowEmpty: false },
      };
      if (value !== "") {
        Constraints.email = true ;
      }

      const ValdationResult = validate({ [id]: value }, { [id]: Constraints })

      return (ValdationResult&& ValdationResult[id])
  
      
}

export const ValidatePassword = (id,value)=>{
    const Constraints = {
        presence: { allowEmpty: false },
      };
      if (value !== "") {
        Constraints.length = {
            minimum:6,
            maximum:12
        } ;
      }

      const ValdationResult = validate({ [id]: value }, { [id]: Constraints })

      return (ValdationResult&& ValdationResult[id])
  
      
}

export const ValidateLength = (id,value,minLength,maxLength,allowEmpty)=>{
  const Constraints = {
      presence: {allowEmpty},
    };
    if (!allowEmpty||value !== "") {
      Constraints.length = {}
      if (minLength!=null){
        Constraints.length.minimum= minLength
      } 
      if (maxLength!= null){
        Constraints.length.maximum = maxLength
      };
    }

    const ValdationResult = validate({ [id]: value }, { [id]: Constraints })

    return (ValdationResult&& ValdationResult[id])

    
}