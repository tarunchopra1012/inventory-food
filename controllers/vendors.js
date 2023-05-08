import phpUnserialize from 'phpunserialize';
import { getVendors, getTotalVendors } from '../models/vendor.js';

const getVendorData = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;;
    const limit = parseInt(req.query.limit) || 20;

    const offset = (page - 1) * limit;

    const [vendors, total] = await Promise.all([
      getVendors(limit, offset),
      getTotalVendors()
    ]);

    const unserializedVendors = await Promise.all(vendors.map(async (vendor) => {
      const { options, social_profiles, saved_location_id } = vendor;

      const unserializedOptions = options ? await phpUnserialize(options) : options;
      const unserializedSocialProfiles = social_profiles ? await phpUnserialize(social_profiles) : social_profiles;
      const unserializedSavedLocationId = saved_location_id ? await phpUnserialize(saved_location_id) : saved_location_id;

      return { 
          ...vendor, 
          options: unserializedOptions, 
          social_profiles: unserializedSocialProfiles, 
          saved_location_id: unserializedSavedLocationId 
      };
    }));

    res.status(200).json({
      total_vendors: total, 
      data: unserializedVendors 
    });

  } catch (error) {
    next(error);
  }
};

export {
  getVendorData
}