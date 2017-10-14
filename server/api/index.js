import { build } from 'ladda-cache';
import { logger } from 'ladda-logger';
import * as contentfulApi from './contentful';
import * as akismetApi from './akismet';
import CONFIG from '../../config';

const plugins = process.env.NODE_ENV !== 'production' ? [logger()] : [];

const config = {
  contentful: {
    ttl: CONFIG.contentful.ttl,
    api: contentfulApi
  },
  akismet: {
    ttl: CONFIG.akismet.ttl,
    api: akismetApi
  },
  cache: {
    api: {
      clear: () => Promise.resolve()
    },
    invalidatesOn: ['NO_OPERATION'],
    invalidates: ['contentful', 'next', 'cache']
  }
};

export default build(config, plugins);
