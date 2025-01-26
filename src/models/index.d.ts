import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerEnterpriseSurvey = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EnterpriseSurvey, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly industry_name?: string | null;
  readonly year?: string | null;
  readonly variable_name?: string | null;
  readonly value?: string | null;
  readonly unit?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEnterpriseSurvey = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EnterpriseSurvey, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly industry_name?: string | null;
  readonly year?: string | null;
  readonly variable_name?: string | null;
  readonly value?: string | null;
  readonly unit?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EnterpriseSurvey = LazyLoading extends LazyLoadingDisabled ? EagerEnterpriseSurvey : LazyEnterpriseSurvey

export declare const EnterpriseSurvey: (new (init: ModelInit<EnterpriseSurvey>) => EnterpriseSurvey) & {
  copyOf(source: EnterpriseSurvey, mutator: (draft: MutableModel<EnterpriseSurvey>) => MutableModel<EnterpriseSurvey> | void): EnterpriseSurvey;
}