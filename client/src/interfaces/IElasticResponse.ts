import { IComment } from './IComment';

export interface IElasticDocument {
	_index: string;
	_type: string;
	_id: string;
	_score: number;
	_source: IComment;
}

export interface IElasticGetResponse extends IElasticDocument {
	_version: number;
	_seq_no: number;
	_primary_term: number;
	found: true;
}

export interface IElasticSearchResponse {
	product: {
		took: number;
		timed_out: boolean;
		_shards: {
			total: number;
			successful: number;
			skipped: number;
			failed: number;
		};
		hits: {
			total: {
				value: number;
				relation: string;
			};
			max_score: number;
			hits: IElasticDocument[];
		};
	};
}
