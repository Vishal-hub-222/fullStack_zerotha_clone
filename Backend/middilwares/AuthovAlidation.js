import joi from "joi";
const signupValidation = async (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
  });
        const {error} = schema.validate(req.body);
    if(error) 
    {
        return res.status(400).json({massage:"bad request",error });
    }
        next();
};

const loginValidation = async (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
  });
        const {error} = schema.validate(req.body);
    if(error) 
    {
        return res.status(400).json({massage:"bad request",error });
    }
        next();
};
export { signupValidation, loginValidation };