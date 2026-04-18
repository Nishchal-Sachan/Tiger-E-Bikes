import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/register — disabled. Admin access uses ADMIN_EMAIL / ADMIN_PASSWORD in .env only.
 */
export async function POST() {
  return NextResponse.json(
    {
      error:
        'Admin self-registration is disabled. Set ADMIN_EMAIL, ADMIN_PASSWORD, and JWT_SECRET in .env.local.',
    },
    { status: 403 }
  );
}
