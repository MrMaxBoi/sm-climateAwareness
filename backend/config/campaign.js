const parseDate = (value, fallback) => {
  const date = new Date(value || fallback);
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid campaign date: ${value}`);
  return date;
};

export const campaignConfig = {
  name: process.env.CAMPAIGN_NAME || "EcoLearn Climate Action Campaign",
  startsAt: parseDate(process.env.CAMPAIGN_START, "2026-07-13T00:00:00.000+08:00"),
  endsAt: parseDate(process.env.CAMPAIGN_END, "2026-08-31T23:59:59.999+08:00"),
  timezone: "Asia/Kuala_Lumpur",
  instagramUrl: process.env.INSTAGRAM_URL || "https://www.instagram.com/climate.apu/",
};

if (campaignConfig.endsAt <= campaignConfig.startsAt) {
  throw new Error("CAMPAIGN_END must be after CAMPAIGN_START");
}
