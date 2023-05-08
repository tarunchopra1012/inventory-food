import { conn } from '../config/database.js';

const getVendors = async (limit, offset) => {
    try {
      // const results = await conn.query(getVendorsQuery);
  
      const results = await conn.query(
        `SELECT * FROM wtf_locations LIMIT ? OFFSET ?`,
        [limit, offset]
      );
      const vendors = results;
  
      return vendors;
    } catch (err) {
      throw new Error(err);
    }
};

const getTotalVendors = async () => {
    try {
      const results = await conn.query(`SELECT COUNT(*) as total FROM wtf_locations`);
      const total = results[0].total;
      return total;
    } catch (err) {
      throw new Error(err);
    }
};

export { getVendors, getTotalVendors };