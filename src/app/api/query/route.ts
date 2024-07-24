//@ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../db';

type Data = {
  result?: any;
  error?: string;
};

export default async (req: NextApiRequest ) => {
  if (req.method === 'POST') {
    const { sqlQuery } = req.body;

    if (!sqlQuery) {
      return res.status(400).json({ error: 'Query is required' });
    }

    try {
      const result = await query(sqlQuery);
      res.status(200).json({ result: result.rows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
