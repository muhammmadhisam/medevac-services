import { Layer, ManagedRuntime } from "effect";

import { DatabaseLayer } from "../databases/index.js";
import {
  ExamRepositoryContext,
  HistoryRepositoryContext,
  PatientsRepositoryContext,
  StationPatientRepositoryContext,
} from "../repository/index.js";
import { ExamServiceContext } from "../services/exam/exam.service.js";
import {
  HistoryServiceContext,
  PatientServiceContext,
  StationPatientServiceContext,
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
const StationPatientServiceLive = StationPatientServiceContext.Live.pipe(
  Layer.provide(StationPatientRepositoryContext.Live),
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
  StationPatientServiceLive,
);
export const ServicesRuntime = ManagedRuntime.make(ServicesLive);
