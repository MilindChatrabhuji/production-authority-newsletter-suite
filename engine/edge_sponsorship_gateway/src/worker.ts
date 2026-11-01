/**
 * Cloudflare Workers Entrypoint
 */

import { NewsletterEdgeRouter } from './src/newsletter_edge_router';
import { Env } from './src/types';

const router = new NewsletterEdgeRouter();

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return router.handleRequest(request, env);
  }
};
