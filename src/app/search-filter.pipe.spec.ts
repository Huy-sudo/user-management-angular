import { debounceTime } from 'rxjs';
import { SearchFilterPipe } from './search-filter.pipe';
debounceTime(2000)
describe('SearchFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
