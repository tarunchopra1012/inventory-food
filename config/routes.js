import express from 'express';
import { getVendorData, generateToken, getAllSquareLocations } from '../controllers/vendors.js';

const router = express.Router();

// Define routes
router.get('/vendors', getVendorData);
router.post('/generate_token', generateToken);
router.get('/get_locations', getAllSquareLocations);

export default function(app) {
  app.use(router);
}
