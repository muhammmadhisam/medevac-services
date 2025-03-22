import { Layer, ManagedRuntime } from "effect";

import { DatabaseLayer } from "../databases/index.js";
import {
  ExamRepositoryContext,
  HistoryRepositoryContext,
  PatientsRepositoryContext,
} from "../repository/index.js";
import { ExamServiceContext } from "../services/exam/exam.service.js";
import {
  HistoryServiceContext,
  PatientServiceContext,
} from "../services/index.js";
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
const HistoryServiceLive = HistoryServiceContext.Live.pipe(
  Layer.provide(HistoryRepositoryContext.Live),
  Layer.provide(PrismaClientLive),
);
export const ServicesLive = Layer.mergeAll(
  JwtServiceLive,
  PrismaClientLive,
  PatientServiceLive,
  ExamServiceLive,
  HistoryServiceLive,
);
export const ServicesRuntime = ManagedRuntime.make(ServicesLive);
