import express from 'express';
import { getVendorData, generateToken } from '../controllers/vendors.js';

const router = express.Router();

// Define routes
router.get('/vendors', getVendorData);

router.post('/generate_token', generateToken);

export default function(app) {
  app.use(router);
}
