import express from 'express';
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import { ParsedQs } from 'qs'
import { UserModel } from '..';

export interface ValidatedRequest<T extends ValidatedRequestSchema> extends express.Request {
  body: T[ContainerTypes.Body]
  query: T[ContainerTypes.Query] & ParsedQs
  headers: T[ContainerTypes.Headers]
  params: T[ContainerTypes.Params]
  user: UserModel;
}
