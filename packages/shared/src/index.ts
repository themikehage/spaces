import { z } from "zod";

export const HealthStatusSchema = z.object({
  status: z.string(),
  time: z.number(),
  uptime: z.number().optional(),
});

export type HealthStatus = z.infer<typeof HealthStatusSchema>;
