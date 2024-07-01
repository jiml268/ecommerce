const Joi = require('joi')

 const createCardJoiSchema = Joi.object().keys({ 
      
     name: Joi.string() 
         .min(5)
         .max(40)
        .required(), 
                    
        cardNum: Joi.string() 
         .length(16)
         .pattern(/^[0-9]+$/)
         .required(),  
        
        expireMth: Joi.string() 
             .length(2)
            .pattern(/^[0-9]+$/)
            .valid('01','02','03','04','05','06','07','08', '09','10','11','12')
         .required(),   
        
     expire_yr: Joi.number()
         .greater(2023)
         .less(2034)
         .required(),  
     
     lastFour: Joi.string() 
         .length(4)
         .pattern(/^[0-9]+$/)
         .required(),  
     
     user_id: Joi.number() 
         .required(),  
        
    }).options({ abortEarly: false }); 
 

module.exports = {
  createCardJoiSchema,
}