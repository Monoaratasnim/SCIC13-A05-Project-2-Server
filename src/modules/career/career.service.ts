import { Career } from "./career.model";
import { ICareer } from "./career.interface";


// CREATE CAREER PROFILE
export const createCareerProfile = async (
  userId: string,
  payload: Partial<ICareer>
) => {

  const existingCareer = await Career.findOne({
    user: userId,
  });

  if (existingCareer) {
    throw new Error(
      "Career profile already exists"
    );
  }


  const career = await Career.create({
    ...payload,
    user: userId,
  });


  return career;
};



// GET USER CAREER PROFILE
export const getMyCareerProfile = async (
  userId: string
) => {

  const career = await Career.findOne({
    user: userId,
  });


  if (!career) {
    throw new Error(
      "Career profile not found"
    );
  }


  return career;
};



// UPDATE CAREER PROFILE
export const updateCareerProfile = async (
  userId: string,
  payload: Partial<ICareer>
) => {

  const career = await Career.findOneAndUpdate(
    {
      user: userId,
    },
    payload,
    {
      new: true,
      runValidators: true,
    }
  );


  if (!career) {
    throw new Error(
      "Career profile not found"
    );
  }


  return career;
};