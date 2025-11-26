export function generateBookingConfirmedEmailHtml(options: {
  siteName?: string;
  sessionMetadata: { [key: string]: any };
  useLink: string;
  year?: number;
}) {
  const { siteName = "Serenory", sessionMetadata, useLink, year = new Date().getFullYear() } = options;

  // Safe access helpers
  const safe = (k: string) => sessionMetadata?.[k] ?? "";
  const timeString = sessionMetadata?.time ? new Date(sessionMetadata.time).toLocaleString() : "";

  return `
  <div style="font-family: 'Inter', Arial, sans-serif; background-color: #f9fafb; padding: 32px; color: #111827;">
    <!-- Header / Logo -->
    <table width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 32px;">
      <tr>
        <td align="center">
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #34d399, #14b8a6, #3b82f6); border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle" width="28" height="28" stroke="#fff" fill="none" viewBox="0 0 24 24">
                <path d="M21 12a9 9 0 1 1 -18 0a9 9 0 0 1 18 0z"></path>
                <path d="M8 10h.01"></path>
                <path d="M12 10h.01"></path>
                <path d="M16 10h.01"></path>
              </svg>
            </div>
            <div>
              <h1 style="margin: 0; font-size: 20px; font-weight: 800; background: linear-gradient(to right, #059669, #0d9488); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${siteName}</h1>
              <p style="margin: 0; font-size: 12px; color: #6b7280;">Talk freely. Feel heard.</p>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <!-- Main Card -->
    <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 28px; box-shadow: 0 4px 16px rgba(0,0,0,0.05);">
      <h2 style="margin-top: 0; font-size: 22px; font-weight: 700; color: #111827;">Your session is confirmed 🎉</h2>
      <p style="font-size: 15px; color: #374151;">Thank you for booking with ${siteName}! Here are your session details:</p>

      <table width="100%" cellspacing="0" cellpadding="0" style="margin: 20px 0;">
        <tr>
          <td style="padding: 6px 0; font-size: 14px; color: #6b7280; width: 120px;">Type:</td>
          <td style="padding: 6px 0; font-size: 14px; color: #111827;">${safe("type")}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Mood:</td>
          <td style="padding: 6px 0; font-size: 14px; color: #111827;">${safe("mood")}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Time:</td>
          <td style="padding: 6px 0; font-size: 14px; color: #111827;">${timeString}</td>
        </tr>
      </table>

      <!-- Meeting Link Button -->
      <div style="text-align: center; margin-top: 24px;">
        <a href="${useLink}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #34d399, #14b8a6, #3b82f6); color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 15px; letter-spacing: 0.5px;"> Join Meeting </a>
      </div>
    </div>

    <!-- Footer -->
    <p style="margin-top: 32px; font-size: 12px; color: #9ca3af; text-align: center;"> You received this email because you booked a session on ${siteName}.<br/> &copy; ${year} ${siteName}. All rights reserved. </p>
  </div>
  `;
}

export default generateBookingConfirmedEmailHtml;
