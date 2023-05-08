import express from 'express';
import { getVendorData } from '../controllers/vendors.js';

const router = express.Router();

// Define routes
router.get('/vendors', getVendorData);

export default function(app) {
  app.use(router);
}
