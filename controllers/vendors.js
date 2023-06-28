import phpUnserialize from 'phpunserialize';
import { getVendors, getTotalVendors } from '../models/vendor.js';
import jwt from 'jsonwebtoken';
import { conn } from '../config/database.js';
import SquareHelper from '../helpers/square.js';

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

const generateToken = async (req, res, next) => {
  let post = req.body;

  if(post.email && post.password) {
    await conn.query("SELECT location_id from wtf_locations where email = ? and password = ?", [post.email, post.password], async function(err, rows) {
      if (err) {
        res.send({
            status: "error",
            message: err,
            data: []
        });
      } else {
        if (rows && rows.length > 0) {
          let getToken = await jwt.sign({
                  data: rows[0]["location_id"],
              },
              post.email, {
                  expiresIn: "12h"
              }
          );

          res.send({
              status: "ok",
              message: "success",
              web_access_token: getToken,
          });
      } else {
          res.send({
              status: "error",
              message: "Not a valid request. user not found.",
          });
      }
      }
    })
  } else {
    res.status(400).json({
      "message": "Please provide valid email and password."
    })
  }
}

const getAllSquareLocations = (req, res, next) => {
  // We will pass vendor id here and fetch its token from the database.
  const token = '';
  // Create an instance of SquareHelper with your Square access token
  const squareHelper = new SquareHelper(token);

  // Call the getVendorLocations method
  squareHelper.getVendorLocations()
    .then((locations) => {
      // Process the locations data
      console.log(locations)
      res.status(200).json(locations);
    })
    .catch((error) => {
      // Handle any errors that occurred
      console.error(error);
    });
}

export {
  getVendorData,
  generateToken,
  getAllSquareLocations
}