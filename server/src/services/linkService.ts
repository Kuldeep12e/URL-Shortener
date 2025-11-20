import { ApiError } from '../errors/ApiError';
import { generateRandomCode } from '../utils/codeGenerator';
import { isValidCode, isValidUrl } from '../utils/validators';
import { linkRepository, Link } from '../repositories/linkRepository';

interface CreateLinkInput {
  targetUrl: string;
  code?: string;
}

export class LinkService {
  async createLink(input: CreateLinkInput): Promise<Link> {
    const targetUrl = input.targetUrl.trim();
    let code = input.code?.trim();

    if (!targetUrl || !isValidUrl(targetUrl)) {
      throw new ApiError(400, 'Invalid URL. Please enter a valid http(s) URL.');
    }

    if (code && !isValidCode(code)) {
      throw new ApiError(400, 'Invalid code. Must match [A-Za-z0-9]{6,8}.');
    }

    // If no custom code, generate one
    if (!code) {
      code = await this.generateUniqueRandomCode();
    } else {
      const existing = await linkRepository.getLinkByCode(code);
      if (existing) {
        throw new ApiError(409, 'Code already exists. Please choose a different code.');
      }
    }

    return linkRepository.createLink(code, targetUrl);
  }

  async generateUniqueRandomCode(): Promise<string> {
    // Keep trying until we get a free code
    // (Collision is very unlikely, but we still check.)
    // We choose length = 6 as requirement says 6–8 characters
    while (true) {
      const candidate = generateRandomCode(6);
      const existing = await linkRepository.getLinkByCode(candidate);
      if (!existing) return candidate;
    }
  }

  async listLinks(): Promise<Link[]> {
    return linkRepository.getAllLinks();
  }

  async getLinkStats(code: string): Promise<Link> {
    if (!isValidCode(code)) {
      throw new ApiError(400, 'Invalid code format.');
    }

    const link = await linkRepository.getLinkByCode(code);
    if (!link) {
      throw new ApiError(404, 'Link not found.');
    }

    return link;
  }

  async deleteLink(code: string): Promise<void> {
    if (!isValidCode(code)) {
      throw new ApiError(400, 'Invalid code format.');
    }

    const deleted = await linkRepository.deleteLink(code);
    if (!deleted) {
      throw new ApiError(404, 'Link not found.');
    }
  }

  async redirect(code: string): Promise<Link> {
    if (!isValidCode(code)) {
      throw new ApiError(404, 'Link not found.');
    }

    const updated = await linkRepository.incrementClick(code);
    if (!updated) {
      throw new ApiError(404, 'Link not found.');
    }

    return updated;
  }
}

export const linkService = new LinkService();
