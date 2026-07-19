import { User } from "../user/user.model";
import { CareerLibrary } from "../career-library/career-library.model";
import type { IAdminStats } from "./admin.interface";

export const getAdminStats = async (): Promise<IAdminStats> => {
  const [totalUsers, totalCareers, industries, ratingResult] =
    await Promise.all([
      User.countDocuments(),
      CareerLibrary.countDocuments(),
      CareerLibrary.distinct("industry"),
      CareerLibrary.aggregate([
        {
          $group: {
            _id: null,
            averageRating: { $avg: "$rating" },
          },
        },
      ]),
    ]);

  const averageRating =
    ratingResult.length > 0
      ? Math.round(ratingResult[0].averageRating * 10) / 10
      : 0;

  return {
    totalUsers,
    totalCareers,
    totalIndustries: industries.length,
    averageRating,
  };
};
