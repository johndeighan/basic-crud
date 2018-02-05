import {TestBed, inject} from '@angular/core/testing';

import {FalcorModelService} from './falcor-model.service';

describe('FalcorModelService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [FalcorModelService]
			});
		});

	it('should be created', inject([FalcorModelService], (service: FalcorModelService) => {
		expect(service).toBeTruthy();
		}));
	});
