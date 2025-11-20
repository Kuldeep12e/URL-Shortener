import { pool } from '../config/db';

export interface Link {
  code: string;
  targetUrl: string;
  totalClicks: number;
  lastClickedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class LinkRepository {
  async createLink(code: string, targetUrl: string): Promise<Link> {
    const now = new Date();
    const sql = `
      INSERT INTO links (code, target_url, total_clicks, last_clicked_at, created_at, updated_at)
      VALUES ($1, $2, 0, NULL, $3, $3)
      RETURNING code, target_url, total_clicks, last_clicked_at, created_at, updated_at
    `;
    const values = [code, targetUrl, now];
    const result = await pool.query(sql, values);
    const row = result.rows[0];

    return {
      code: row.code,
      targetUrl: row.target_url,
      totalClicks: row.total_clicks,
      lastClickedAt: row.last_clicked_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  async getLinkByCode(code: string): Promise<Link | null> {
    const sql = `
      SELECT code, target_url, total_clicks, last_clicked_at, created_at, updated_at
      FROM links
      WHERE code = $1
    `;
    const result = await pool.query(sql, [code]);

    if (result.rowCount === 0) return null;
    const row = result.rows[0];

    return {
      code: row.code,
      targetUrl: row.target_url,
      totalClicks: row.total_clicks,
      lastClickedAt: row.last_clicked_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  async getAllLinks(): Promise<Link[]> {
    const sql = `
      SELECT code, target_url, total_clicks, last_clicked_at, created_at, updated_at
      FROM links
      ORDER BY created_at DESC
    `;
    const result = await pool.query(sql);
    return result.rows.map((row) => ({
      code: row.code,
      targetUrl: row.target_url,
      totalClicks: row.total_clicks,
      lastClickedAt: row.last_clicked_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }

  async deleteLink(code: string): Promise<boolean> {
    const sql = `DELETE FROM links WHERE code = $1`;
    const result = await pool.query(sql, [code]);
    return result.rowCount > 0;
  }

  async incrementClick(code: string): Promise<Link | null> {
    const now = new Date();
    const sql = `
      UPDATE links
      SET total_clicks = total_clicks + 1,
          last_clicked_at = $2,
          updated_at = $2
      WHERE code = $1
      RETURNING code, target_url, total_clicks, last_clicked_at, created_at, updated_at
    `;
    const result = await pool.query(sql, [code, now]);
    if (result.rowCount === 0) return null;

    const row = result.rows[0];
    return {
      code: row.code,
      targetUrl: row.target_url,
      totalClicks: row.total_clicks,
      lastClickedAt: row.last_clicked_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

export const linkRepository = new LinkRepository();
