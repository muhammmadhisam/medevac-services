import { Layer, ManagedRuntime } from "effect";

import { DatabaseLayer } from "../databases/index.js";
import {
  ExamRepositoryContext,
  PatientsRepositoryContext,
} from "../repository/index.js";
import { ExamServiceContext } from "../services/exam/exam.service.js";
import { PatientServiceContext } from "../services/index.js";
import { JwtServiceContext } from "../services/jwt/jwt.service.js";

const PrismaClientLive = DatabaseLayer.Live;
const JwtServiceLive = JwtServiceContext.Live;
const PatientServiceLive = PatientServiceContext.Live.pipe(
  Layer.provide(PatientsRepositoryContext.Live),
  Layer.provide(PrismaClientLive),
);
const ExamServiceLive = ExamServiceContext.Live.pipe(
  Layer.provide(ExamRepositoryContext.Live),
  Layer.provide(PrismaClientLive),
);

export const ServicesLive = Layer.mergeAll(
  JwtServiceLive,
  PrismaClientLive,
  PatientServiceLive,
  ExamServiceLive,
);
export const ServicesRuntime = ManagedRuntime.make(ServicesLive);
