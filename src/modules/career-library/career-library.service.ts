import { CareerLibrary } from "./career-library.model";
import { Roadmap } from "../ai/roadmap.model";
import { Recommendation } from "../ai/recommendation.model";
import { ICareerLibrary } from "./career-library.interface";


export interface CareerLibraryQueryParams {
  search?: string;
  industry?: string;
  experienceLevel?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedCareersResult {
  careers: ICareerLibrary[];
  total: number;
  page: number;
  totalPages: number;
}


// GET ALL CAREERS (Admin — unpaginated)
export const getAllCareers = async () => {
  const careers = await CareerLibrary.find().sort({
    createdAt: -1,
  });
  return careers;
};


// GET CAREERS WITH FILTERING, SORTING, PAGINATION (Public)
export const getCareersPaginated = async (
  params: CareerLibraryQueryParams
): Promise<PaginatedCareersResult> => {
  const {
    search,
    industry,
    experienceLevel,
    sort = "-createdAt",
    page = 1,
    limit = 12,
  } = params;

  const filter: Record<string, any> = {};

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  if (industry) {
    filter.industry = industry;
  }

  if (experienceLevel) {
    filter.experienceLevel = experienceLevel;
  }

  const total = await CareerLibrary.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);
  const skip = (page - 1) * limit;

  const sortObj: Record<string, 1 | -1> = {};
  if (sort === "rating") {
    sortObj.rating = 1;
  } else if (sort === "-rating") {
    sortObj.rating = -1;
  } else if (sort === "title") {
    sortObj.title = 1;
  } else if (sort === "-title") {
    sortObj.title = -1;
  } else {
    sortObj.createdAt = -1;
  }

  const careers = await CareerLibrary.find(filter)
    .sort(sortObj)
    .skip(skip)
    .limit(limit);

  return { careers, total, page, totalPages };
};


// GET SINGLE CAREER (Public)
export const getCareerById = async (id: string) => {
  const career = await CareerLibrary.findById(id);

  if (!career) {
    throw new Error("Career not found");
  }

  return career;
};


// CREATE CAREER (Admin)
export const createCareer = async (
  payload: Partial<ICareerLibrary>
) => {
  const career = await CareerLibrary.create(payload);
  return career;
};


// UPDATE CAREER (Admin)
export const updateCareer = async (
  id: string,
  payload: Partial<ICareerLibrary>
) => {
  const career = await CareerLibrary.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true }
  );

  if (!career) {
    throw new Error("Career not found");
  }

  return career;
};


// DELETE CAREER (Admin)
export const deleteCareer = async (id: string) => {
  const career = await CareerLibrary.findByIdAndDelete(id);

  if (!career) {
    throw new Error("Career not found");
  }

  return career;
};


// PUBLIC STATS
export const getPublicStats = async () => {
  const [totalCareers, industries, roadmapCount, recommendationCount] =
    await Promise.all([
      CareerLibrary.countDocuments(),
      CareerLibrary.distinct("industry"),
      Roadmap.countDocuments(),
      Recommendation.countDocuments(),
    ]);

  return {
    totalCareers,
    totalIndustries: industries.length,
    totalRoadmaps: roadmapCount,
    totalRecommendations: recommendationCount,
  };
};


// INDUSTRY DISTRIBUTION
export const getIndustryDistribution = async () => {
  const result = await CareerLibrary.aggregate([
    {
      $group: {
        _id: "$industry",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $project: {
        _id: 0,
        industry: "$_id",
        count: 1,
      },
    },
  ]);

  return result;
};
