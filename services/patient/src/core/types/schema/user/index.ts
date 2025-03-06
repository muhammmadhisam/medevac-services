import { z } from "zod";

export const RoleUsersSchema = z.enum(["RootAdmin", "Admin", "User"]);
export const StatusUserSchema = z.enum(["Pending", "Activate", "Block"]);
export const userSchema = z.object({
  address: z.string().nullish(),
  career: z.string().nullish(),
  create_date: z.coerce.date(),
  delete_date: z.coerce.date().nullish(),
  email: z.string().nullish(),
  first_name: z.string(),
  hospital_branch_id: z.string().nullish(),
  id: z.string().uuid(),
  id_card: z.string().nullish(),
  image: z.string().nullish(),
  last_name: z.string(),
  password: z.string(),
  phone_number: z.string().nullish(),
  refresh_token: z.string().nullish(),
  role: RoleUsersSchema,
  status: StatusUserSchema,
  update_date: z.coerce.date(),
  username: z.string(),
});
