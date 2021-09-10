import { TestBed } from '@angular/core/testing';

import { MultiselectDropdownSettingService } from './multiselect-dropdown-setting.service';

describe('MultiselectDropdownSettingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MultiselectDropdownSettingService = TestBed.get(MultiselectDropdownSettingService);
    expect(service).toBeTruthy();
  });
});
