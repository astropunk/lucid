import assert from 'assert';
import { stub } from 'sinon';

import {
	onPageSelect,
	onPageSizeSelect,
	__RewireAPI__ as rewire,
} from './Paginator.reducers.js';

describe('Paginator reducers', () => {

	const initialState = {
		selectedPageIndex: 1,
		selectedPageSizeIndex: 0,
		SingleSelect: {},
	};
	const totalPages = 5;

	describe('onPageSelect', () => {
		it('should set the selectedPageIndex to the payload', () => {
			const pageIndex = 2;
			const nextState = onPageSelect(initialState, pageIndex, totalPages);
			assert.equal(nextState.selectedPageIndex, pageIndex, `must be ${pageIndex}`);
		});
		it('should set the selectedPageIndex to 0 if payload < 0', () => {
			const pageIndex = -1;
			const nextState = onPageSelect(initialState, pageIndex, totalPages);
			assert.equal(nextState.selectedPageIndex, 0, 'must be 0');
		});
		it('should not exceed totalPages', () => {
			const pageIndex = 5;
			const nextState = onPageSelect(initialState, pageIndex, totalPages);
			assert.equal(nextState.selectedPageIndex, 4, 'must be 4');
		});
	});

	describe('onPageSizeSelect', () => {

		const SingleSelect = { onSelect: stub() };
		rewire.__Rewire__('SingleSelect', SingleSelect);

		beforeEach(() => SingleSelect.onSelect.reset());

		it('should set the selectedPageIndex to 0', () => {
			const pageIndex = 2;
			const nextState = onPageSizeSelect(initialState, pageIndex, totalPages);
			assert.equal(nextState.selectedPageIndex, 0, 'must be 0');
		});

		it('should call SingleSelect.onSelect with state.SingleSelect and selectedPageSizeIndex', () => {
			const pageIndex = 2;
			onPageSizeSelect(initialState, pageIndex, totalPages);
			assert(SingleSelect.onSelect.calledWith(initialState.SingleSelect, pageIndex), pageIndex, 'must be 2');
		});

		it('should set state.SingleSelect to the return value of SingleSelect.onSelect', () => {
			const mockValue = {};
			const pageIndex = 2;
			SingleSelect.onSelect.returns(mockValue);
			const nextState = onPageSizeSelect(initialState, pageIndex, totalPages);
			assert.strictEqual(nextState.SingleSelect, mockValue, 'must be `mockValue`');
		});

	});

});
