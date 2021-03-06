import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  FETCH_METRICS,
  FETCH_PREFS,
  FETCH_USER,
  getMetrics,
  getPreferences,
  getUser,
} from '../../../js/actions/index';

describe('actions', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterAll(() => {
    mockAxios.restore();
  });

  it('getMetric has the correct type', () => {
    mockAxios.onGet('/v1/metrics/').reply(200);
    const metrics = getMetrics('v1');
    expect(metrics.type).toBe(FETCH_METRICS);
  });

  describe('getPreferences has the correct type', () => {
    it('email is undefined', () => {
      mockAxios.onGet('/v1/user/preferences/').reply(200);
      const metrics = getPreferences();
      expect(metrics.type).toBe(FETCH_PREFS);
    });

    it('email is defined', () => {
      mockAxios.onGet('/v1/user/preferences/?email=foo@bar.com').reply(200);
      const metrics = getPreferences('foo@bar.com');
      expect(metrics.type).toBe(FETCH_PREFS);
    });
  });

  describe('getUser has the correct type', () => {
    it('email is undefined', () => {
      mockAxios.onGet('/v1/user/').reply(200);
      const metrics = getUser('');
      expect(metrics.type).toBe(FETCH_USER);
    });

    it('email is defined', () => {
      mockAxios.onGet('/v1/user/?email=foo@bar.com').reply(200);
      const metrics = getUser('foo@bar.com');
      expect(metrics.type).toBe(FETCH_USER);
    });
  });
});
