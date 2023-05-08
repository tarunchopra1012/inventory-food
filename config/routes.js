import express from 'express';
import { getVendorData, getFlagData } from '../controllers/vendor.js';

const router = express.Router();

// Define routes
router.get('/vendors', getVendorData);
router.get('/flag_vendors', getFlagData);

export default function(app) {
  app.use(router);
}
